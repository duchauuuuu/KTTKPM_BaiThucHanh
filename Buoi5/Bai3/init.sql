CREATE DATABASE IF NOT EXISTS servicedb;
USE servicedb;

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    product_name  VARCHAR(100) NOT NULL,
    quantity      INT NOT NULL,
    total_amount  DECIMAL(10,2) NOT NULL,
    status        VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id   BIGINT NOT NULL,
    amount     DECIMAL(10,2) NOT NULL,
    method     VARCHAR(50) NOT NULL DEFAULT 'CREDIT_CARD',
    status     VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    paid_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shippings (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id        BIGINT NOT NULL,
    address         VARCHAR(255) NOT NULL,
    carrier         VARCHAR(100) NOT NULL DEFAULT 'GHTK',
    tracking_number VARCHAR(100),
    status          VARCHAR(50) NOT NULL DEFAULT 'PREPARING',
    shipped_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
