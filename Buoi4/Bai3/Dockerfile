# Sử dụng node:18-alpine làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Cài đặt serve để phục vụ build artifacts
RUN npm install -g serve

# Expose cổng 3000
EXPOSE 3000

# Khởi chạy ứng dụng React đã build
CMD ["serve", "-s", "build", "-l", "3000"]
