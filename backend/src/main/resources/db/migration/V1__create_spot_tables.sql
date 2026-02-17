CREATE TABLE spots (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  region VARCHAR(50) NOT NULL,
  address VARCHAR(200) NOT NULL,
  recommended_time VARCHAR(100) NOT NULL,
  recommended_season VARCHAR(100) NOT NULL,
  hero_image_url VARCHAR(500) NOT NULL,
  is_weekly_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spot_photos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  spot_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(200),
  sort_order INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_spot_photos_spot FOREIGN KEY (spot_id) REFERENCES spots (id)
);

CREATE TABLE spot_reviews (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  spot_id BIGINT NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  content VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_spot_reviews_spot FOREIGN KEY (spot_id) REFERENCES spots (id)
);

CREATE INDEX idx_spots_weekly_featured ON spots (is_weekly_featured);
CREATE INDEX idx_spot_photos_spot_id_sort ON spot_photos (spot_id, sort_order);
CREATE INDEX idx_spot_reviews_spot_id_created_at ON spot_reviews (spot_id, created_at);
