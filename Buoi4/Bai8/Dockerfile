# Sử dụng PostgreSQL 15 làm base image
FROM postgres:15

# Thiết lập các biến môi trường cho PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret123
ENV POSTGRES_DB=myappdb

# Copy file SQL khởi tạo vào thư mục init của PostgreSQL
# Các file trong thư mục này sẽ tự động được chạy khi container khởi động lần đầu
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Expose cổng PostgreSQL mặc định
EXPOSE 5432
