export interface Product {
  id: string;
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
  created_at: string;
  product_images: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface DashboardStats {
  total: number;
  newCount: number;
  soldOutCount: number;
}
