-- =============================================
-- Eira Project — Supabase Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  price TEXT NOT NULL DEFAULT 'Rp 195.000',
  material TEXT DEFAULT 'Milano Dryfit',
  gsm TEXT DEFAULT '220',
  production_time TEXT DEFAULT '5–7 hari kerja',
  size_tolerance TEXT DEFAULT '1–3 cm',
  badge TEXT NOT NULL DEFAULT 'NEW' CHECK (badge IN ('NEW', 'LIMITED', 'SOLD OUT')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sort ON products(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);

-- 4. Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  USING (true);

-- Public can read product images
CREATE POLICY "Public can view product images"
  ON product_images FOR SELECT
  USING (true);

-- Authenticated users can do everything (admin)
CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access product_images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
