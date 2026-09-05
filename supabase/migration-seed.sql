-- =============================================
-- Eira Project — Add series column + seed data
-- =============================================

-- 1. Add series column
ALTER TABLE products ADD COLUMN IF NOT EXISTS series TEXT DEFAULT '';

-- 2. Seed products (available)
INSERT INTO products (name, slug, description, price, material, gsm, production_time, size_tolerance, badge, sort_order, series)
VALUES
  ('Velocity Blaze', 'velocity-blaze', 'Jersey fantasy dengan grafis dinamis dan detail rapi. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'NEW', 0, 'Racing Series'),
  ('Nebula Flux', 'nebula-flux', 'Jersey fantasy dengan motif marmer bergelombang dan gradasi lembut. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'NEW', 1, 'Football Series'),
  ('Golden Shards', 'golden-shards', 'Jersey fantasy dengan pecahan grafis tajam dan aksen emas. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'NEW', 2, 'Community Series'),
  ('Aurora Drift', 'aurora-drift', 'Jersey fantasy dengan gradasi warna aurora yang elegan. Dicetak full-print pada bahan Milano Dryfit, jahitan rapi, siap dipakai main atau harian.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'NEW', 3, 'Football Series')
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  badge = EXCLUDED.badge,
  sort_order = EXCLUDED.sort_order,
  series = EXCLUDED.series;

-- 3. Seed sold out products
INSERT INTO products (name, slug, description, price, material, gsm, production_time, size_tolerance, badge, sort_order, series)
VALUES
  ('Ember Tide', 'ember-tide', 'Jersey fantasy dengan tema api dan gradasi warna hangat.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'SOLD OUT', 4, 'Fire Series'),
  ('Solar Rift', 'solar-rift', 'Jersey fantasy dengan motif matahari dan efek cahaya.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'SOLD OUT', 5, 'Light Series'),
  ('Violet Storm', 'violet-storm', 'Jersey fantasy dengan grafis petir ungu yang dinamis.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'SOLD OUT', 6, 'Storm Series'),
  ('Midnight Prism', 'midnight-prism', 'Jersey fantasy dengan efek prismatis dan warna gelap.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'SOLD OUT', 7, 'Night Series'),
  ('Frost Sigil', 'frost-sigil', 'Jersey fantasy dengan motif es dan aksen biru muda.', 'Rp 195.000', 'Milano Dryfit', '220', '5–7 hari kerja', '1–3 cm', 'SOLD OUT', 8, 'Ice Series')
ON CONFLICT (slug) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  badge = EXCLUDED.badge,
  sort_order = EXCLUDED.sort_order,
  series = EXCLUDED.series;

-- 4. Seed product images (available products)
INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601179/pnwq7iwvjsb5fklfkiwi.png', 0
FROM products WHERE slug = 'velocity-blaze'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'velocity-blaze'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601181/lwqp0mufpci3yfojvxjg.png', 1
FROM products WHERE slug = 'velocity-blaze'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'velocity-blaze') AND sort_order = 1);

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601363/rvyvtleqkforocilbh2b.png', 0
FROM products WHERE slug = 'nebula-flux'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'nebula-flux'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788601362/itjqasz0x0dqeqqrc2jd.png', 1
FROM products WHERE slug = 'nebula-flux'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'nebula-flux') AND sort_order = 1);

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600849/sd6rk3qic0nk8hctaget.png', 0
FROM products WHERE slug = 'golden-shards'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'golden-shards'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788600849/efbdsuj9qcocl4hy4ant.png', 1
FROM products WHERE slug = 'golden-shards'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'golden-shards') AND sort_order = 1);

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, 'https://res.cloudinary.com/dqjh7utdb/image/upload/v1788602273/d6ihxscobpmz6ibwzjin.png', 0
FROM products WHERE slug = 'aurora-drift'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'aurora-drift'));

-- 5. Seed product images (sold out products)
INSERT INTO product_images (product_id, url, sort_order)
SELECT id, '/images/db45a9f9-af41-4cad-9611-6d2be74937af.png', 0
FROM products WHERE slug = 'ember-tide'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'ember-tide'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, '/images/75c59814-6786-48b7-a111-d846c580a0a2.png', 0
FROM products WHERE slug = 'solar-rift'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'solar-rift'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, '/images/5a185889-bc31-46c1-9cb5-7d795094036b.png', 0
FROM products WHERE slug = 'violet-storm'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'violet-storm'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, '/images/9ac8e2ce-b1f6-4853-b56b-cd1e90a70d2d.png', 0
FROM products WHERE slug = 'midnight-prism'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'midnight-prism'));

INSERT INTO product_images (product_id, url, sort_order)
SELECT id, '/images/db45a9f9-af41-4cad-9611-6d2be74937af.png', 0
FROM products WHERE slug = 'frost-sigil'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = (SELECT id FROM products WHERE slug = 'frost-sigil'));
