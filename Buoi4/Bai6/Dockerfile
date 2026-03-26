# ============================================================
# Stage 1: Build stage - dùng node:18 để build code
# ============================================================
FROM node:18 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy mã nguồn và chạy bước build
COPY . .
RUN npm run build

# ============================================================
# Stage 2: Production stage - dùng node:18-alpine để chạy
# ============================================================
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json để cài production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy các file đã build từ stage 1
COPY --from=builder /app/app.js ./app.js

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "app.js"]
