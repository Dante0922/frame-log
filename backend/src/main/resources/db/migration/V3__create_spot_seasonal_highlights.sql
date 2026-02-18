CREATE TABLE spot_seasonal_highlights (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    spot_id BIGINT NOT NULL,
    month_start TINYINT NOT NULL,
    month_end TINYINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    tags VARCHAR(300),
    priority INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_seasonal_highlight_spot FOREIGN KEY (spot_id) REFERENCES spots(id)
);

CREATE INDEX idx_seasonal_highlights_spot ON spot_seasonal_highlights(spot_id);
CREATE INDEX idx_seasonal_highlights_month ON spot_seasonal_highlights(month_start, month_end);
