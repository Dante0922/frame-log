CREATE TABLE featured_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    spot_id BIGINT NOT NULL,
    featured_week_start DATE NOT NULL,
    selection_reason VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_featured_history_spot FOREIGN KEY (spot_id) REFERENCES spots(id)
);

CREATE INDEX idx_featured_history_week ON featured_history(featured_week_start);
