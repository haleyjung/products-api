CREATE DATABASE products;

-- **----Tables----**

CREATE TABLE product (
  id SERIAL,
  name VARCHAR(50),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE features (
  id SERIAL,
  product_id integer,
  feature VARCHAR(50),
  value VARCHAR(50),
  PRIMARY KEY(id)
);

CREATE TABLE styles (
  id SERIAL,
  productId integer,
  name VARCHAR(50),
  sale_price VARCHAR(10),
  original_price VARCHAR(10),
  default_style SMALLINT,
  PRIMARY KEY(id)
);

CREATE TABLE photos (
  id SERIAL,
  styleId integer,
  url VARCHAR(2083),
  thumbnail_url TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE skus (
  id SERIAL,
  styleId integer,
  size VARCHAR(20),
  quantity integer,
  PRIMARY KEY(id)
);

CREATE TABLE related (
  id SERIAL,
  current_product_id integer,
  related_product_id integer,
  PRIMARY KEY(id)
);

ALTER TABLE styles ALTER COLUMN default_style TYPE bool USING default_style::int::bool;

-- **----Indexing----**

CREATE INDEX product_id_idx
ON product (id);

CREATE INDEX styles_product_id_idx
ON styles (productId);

CREATE INDEX features_product_id_idx
ON features (product_id);

CREATE INDEX related_product_id_idx
ON related (current_product_id);

CREATE INDEX photos_style_id_idx
ON photos (styleId);

CREATE INDEX skus_style_id_idx
ON skus (styleId);

-- **----ETL Process----**

COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/product.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/styles.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/features.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/related.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/skus.csv'
DELIMITER ','
CSV HEADER;