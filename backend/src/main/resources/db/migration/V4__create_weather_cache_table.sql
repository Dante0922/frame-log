CREATE TABLE weather_cache (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    spot_id BIGINT NOT NULL,
    base_date VARCHAR(8) NOT NULL,
    base_time VARCHAR(4) NOT NULL,
    temperature VARCHAR(10),
    sky_condition VARCHAR(10),
    precipitation_type VARCHAR(10),
    precipitation_probability VARCHAR(10),
    humidity VARCHAR(10),
    wind_speed VARCHAR(10),
    fetched_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_weather_cache_spot FOREIGN KEY (spot_id) REFERENCES spots(id),
    CONSTRAINT uk_weather_spot_date_time UNIQUE (spot_id, base_date, base_time)
);
