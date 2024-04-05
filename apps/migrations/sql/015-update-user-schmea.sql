
ALTER TABLE users.user
ADD COLUMN notifications JSONB;

CREATE TABLE users.read_notifications (
    cleared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notification JSONB
);
