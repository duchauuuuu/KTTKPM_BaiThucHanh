-- Tạo bảng users
-- (Database myappdb đã được tạo tự động bởi biến POSTGRES_DB trong Dockerfile)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu vào bảng users
INSERT INTO users (name, email) VALUES
    ('Nguyen Van A', 'nguyenvana@example.com'),
    ('Tran Thi B', 'tranthib@example.com'),
    ('Le Van C', 'levanc@example.com');

-- Thêm dữ liệu mẫu vào bảng products
INSERT INTO products (name, price, stock) VALUES
    ('Laptop Dell', 15000000.00, 10),
    ('Chuot Logitech', 500000.00, 50),
    ('Ban phim cơ', 1200000.00, 30);
