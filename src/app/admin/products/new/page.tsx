"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ProductImage } from "@/lib/types";

interface FormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  material: string;
  gsm: string;
  production_time: string;
  size_tolerance: string;
  badge: "NEW" | "LIMITED" | "SOLD OUT";
  sort_order: number;
}

const BADGES = ["NEW", "LIMITED", "SOLD OUT"] as const;

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.id;

  const [form, setForm] = useState<FormData>({
    name: "",
    slug: "",
    description: "",
    price: "Rp 195.000",
    material: "Milano Dryfit",
    gsm: "220",
    production_time: "5–7 hari kerja",
    size_tolerance: "1–3 cm",
    badge: "NEW",
    sort_order: 0,
  });

  const [images, setImages] = useState<ProductImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const supabase = createClient();
      supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("id", params.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setForm({
              name: data.name,
              slug: data.slug,
              description: data.description || "",
              price: data.price,
              material: data.material || "Milano Dryfit",
              gsm: data.gsm || "220",
              production_time: data.production_time || "5–7 hari kerja",
              size_tolerance: data.size_tolerance || "1–3 cm",
              badge: data.badge,
              sort_order: data.sort_order,
            });
            setImages(data.product_images || []);
          }
        });
    }
  }, [isEdit, params?.id]);

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
  }

  function updateField(field: keyof FormData, value: string | number) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "name" && !isEdit) {
        next.slug = autoSlug(value as string);
      }
      return next;
    });
  }

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setUploading(true);

      for (const file of Array.from(files)) {
        // Get signed params from our API
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "eira-project/products" }),
        });
        const signData = await signRes.json();

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", signData.folder);
        formData.append("public_id", signData.public_id);
        formData.append("timestamp", String(signData.timestamp));
        formData.append("api_key", signData.api_key);
        formData.append("signature", signData.signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();

        if (uploadData.secure_url) {
          // Save URL to database
          const supabase = createClient();
          const { data: imgData } = await supabase
            .from("product_images")
            .insert({
              product_id: params?.id || "pending",
              url: uploadData.secure_url,
              sort_order: images.length,
            })
            .select()
            .single();

          if (imgData) {
            setImages((prev) => [...prev, imgData]);
          }
        }
      }

      setUploading(false);
    },
    [images.length, params?.id]
  );

  async function handleDeleteImage(img: ProductImage) {
    // Extract public_id from Cloudinary URL
    const parts = img.url.split("/");
    const folderAndFile = parts.slice(parts.indexOf("upload") + 1).join("/");
    const publicId = folderAndFile.replace(/\.[^.]+$/, "");

    await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId }),
    });

    const supabase = createClient();
    await supabase.from("product_images").delete().eq("id", img.id);
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: form.price,
      material: form.material,
      gsm: form.gsm,
      production_time: form.production_time,
      size_tolerance: form.size_tolerance,
      badge: form.badge,
      sort_order: form.sort_order,
    };

    if (isEdit) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", params.id);
      if (error) {
        alert("Gagal update: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select("id")
        .single();
      if (error || !data) {
        alert("Gagal simpan: " + (error?.message || "Unknown error"));
        setSaving(false);
        return;
      }
      // Update images that were uploaded with "pending" product_id
      await supabase
        .from("product_images")
        .update({ product_id: data.id })
        .eq("product_id", "pending");
    }

    router.push("/admin/products");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-2.5 text-[12px] text-[var(--ink)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] transition-colors";
  const labelClass = "block text-[10px] track uppercase text-[var(--muted)] mb-1.5";

  return (
    <div className="admin-page-enter max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--ink)] hover:bg-white/5 transition-colors cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h1 className="disp text-xl font-extrabold uppercase tracking-tight text-[var(--ink)]">
            {isEdit ? "Edit Produk" : "Tambah Produk"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-4">
          <p className="text-[10px] track uppercase text-[var(--gold)] font-medium">Informasi Dasar</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nama Produk</label>
              <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} required className={inputClass} placeholder="Velocity Blaze" />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input type="text" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required className={inputClass} placeholder="velocity-blaze" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className={inputClass + " resize-none"} placeholder="Jersey fantasy dengan grafis dinamis..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Harga</label>
              <input type="text" value={form.price} onChange={(e) => updateField("price", e.target.value)} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Badge</label>
              <select value={form.badge} onChange={(e) => updateField("badge", e.target.value)} className={inputClass + " cursor-pointer"}>
                {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-4">
          <p className="text-[10px] track uppercase text-[var(--gold)] font-medium">Spesifikasi</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Bahan</label>
              <input type="text" value={form.material} onChange={(e) => updateField("material", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>GSM</label>
              <input type="text" value={form.gsm} onChange={(e) => updateField("gsm", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Waktu Produksi</label>
              <input type="text" value={form.production_time} onChange={(e) => updateField("production_time", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Toleransi Ukuran</label>
              <input type="text" value={form.size_tolerance} onChange={(e) => updateField("size_tolerance", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Urutan Tampil</label>
            <input type="number" value={form.sort_order} onChange={(e) => updateField("sort_order", parseInt(e.target.value) || 0)} className={inputClass + " w-32"} />
          </div>
        </div>

        {/* Image Upload */}
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-5 space-y-4">
          <p className="text-[10px] track uppercase text-[var(--gold)] font-medium">Foto Produk</p>

          {/* Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-[var(--line)]">
                  <img src={img.url} alt="" className="w-full aspect-square object-cover" />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragOver ? "border-[var(--gold)] bg-[var(--gold)]/5" : "border-[var(--line)]"
            }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                <p className="text-[12px] text-[var(--muted)]">Mengupload...</p>
              </div>
            ) : (
              <>
                <p className="text-[12px] text-[var(--muted)]">Drag & drop foto ke sini, atau</p>
                <label className="mt-2 inline-block cursor-pointer">
                  <span className="text-[11px] track uppercase text-[var(--gold)] hover:underline">Pilih File</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files)} />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-[var(--line)] px-6 py-2.5 text-[11px] track uppercase text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[var(--gold)] px-8 py-2.5 text-[11px] track uppercase font-bold text-[#090A0C] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Menyimpan..." : isEdit ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
