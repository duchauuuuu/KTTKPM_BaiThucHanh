# Sử dụng nginx:latest làm base image
FROM nginx:latest

# Xóa trang mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy file index.html vào thư mục phục vụ của Nginx
COPY index.html /usr/share/nginx/html/index.html

# Expose cổng 80
EXPOSE 80

# Nginx tự động khởi chạy khi container start
CMD ["nginx", "-g", "daemon off;"]
