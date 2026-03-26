# Sử dụng golang:1.21 làm base image để build
FROM golang:1.21-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy go.mod vào container
COPY go.mod .

# Download dependencies
RUN go mod download

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng Go, tạo binary tĩnh
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Stage 2: Chạy ứng dụng trên image nhỏ nhất
FROM alpine:latest

WORKDIR /app

# Copy binary từ builder stage
COPY --from=builder /app/main .

# Expose cổng 8080
EXPOSE 8080

# Chạy binary
CMD ["./main"]
