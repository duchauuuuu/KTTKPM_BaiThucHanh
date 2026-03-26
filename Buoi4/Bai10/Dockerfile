# Sử dụng php:8.2-apache làm base image
FROM php:8.2-apache

# Bật module rewrite của Apache (hữu ích cho các ứng dụng PHP)
RUN a2enmod rewrite

# Thiết lập thư mục làm việc
WORKDIR /var/www/html

# Copy mã nguồn PHP vào thư mục phục vụ của Apache
# Lưu ý: Khi chạy container, có thể mount thư mục src từ host
# bằng lệnh: docker run -v $(pwd)/src:/var/www/html -p 8080:80 ...
COPY src/ /var/www/html/

# Expose cổng 80
EXPOSE 80

# Apache tự động khởi chạy bởi base image
