-- DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

USE products;

CREATE TABLE product (
  id SERIAL,
  name VARCHAR(50),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price VARCHAR(20),
  PRIMARY KEY(id)
);

CREATE TABLE styles (
  id SERIAL,
  name VARCHAR(50),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style SMALLINT,
  PRIMARY KEY(id),
  product_id integer REFERENCES product
);

CREATE TABLE features (
  id SERIAL,
  feature VARCHAR(50),
  value VARCHAR(50),
  PRIMARY KEY(id),
  product_id integer REFERENCES product
);

CREATE TABLE related (
  id SERIAL,
  related_product_id integer,
  PRIMARY KEY(id),
  current_product_id integer REFERENCES product
);

CREATE TABLE photos (
  id SERIAL,
  url VARCHAR(2083),
  thumbnail_url TEXT,
  PRIMARY KEY(id),
  styles_id integer REFERENCES styles
  -- CONSTRAINT fk_photos
  --   FOREIGN KEY (styles_id)
  --     REFERENCES styles(id)
  --     ON DELETE CASCADE
);

CREATE TABLE skus (
  id SERIAL,
  quantity integer,
  size VARCHAR(20),
  PRIMARY KEY(id),
  styles_id integer REFERENCES styles
);