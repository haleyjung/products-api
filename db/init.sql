-- DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

CREATE TABLE product (
  id SERIAL,
  name VARCHAR(50),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price VARCHAR(20),
  PRIMARY KEY(id)
);

\COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/haleyjung/Documents/_HACKREACTOR/2022-02_Immersive/SDC/dataset/product.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE styles (
  id SERIAL,
  name VARCHAR(50),
  original_price VARCHAR(10),
  sale_price VARCHAR(10),
  default_style SMALLINT,
  PRIMARY KEY(id),
  -- product_id integer REFERENCES product
  product_id integer,
);

CREATE TABLE features (
  id SERIAL,
  feature VARCHAR(50),
  value VARCHAR(50),
  PRIMARY KEY(id),
  -- product_id integer REFERENCES product
  product_id integer,
);

CREATE TABLE related (
  id SERIAL,
  related_product_id integer,
  PRIMARY KEY(id),
  -- current_product_id integer REFERENCES product
  current_product_id integer,
);

CREATE TABLE photos (
  id SERIAL,
  url VARCHAR(2083),
  thumbnail_url TEXT,
  PRIMARY KEY(id),
  -- styles_id integer REFERENCES styles
  styles_id integer,
);

CREATE TABLE skus (
  id SERIAL,
  quantity integer,
  size VARCHAR(20),
  PRIMARY KEY(id),
  -- styles_id integer REFERENCES styles
  styles_id integer,
);

CREATE TABLE cart (
  id SERIAL,
  user_session integer,
  product_id integer,
  active boolean
);

ALTER TABLE styles ALTER COLUMN default_style TYPE bool USING default_style::int::bool;