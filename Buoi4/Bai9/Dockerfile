# Sử dụng redis:latest làm base image
FROM redis:latest

# Copy file cấu hình Redis tùy chỉnh vào container
COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose cổng Redis mặc định
EXPOSE 6379

# Khởi chạy Redis với file cấu hình tùy chỉnh
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
