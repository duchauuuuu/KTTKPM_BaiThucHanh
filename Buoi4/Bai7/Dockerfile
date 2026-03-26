# Sử dụng Python 3.9 làm base image
FROM python:3.9

# Thiết lập thư mục làm việc
WORKDIR /app

# Khai báo biến môi trường với giá trị mặc định là "development"
ENV APP_ENV=development

# Copy mã nguồn vào container
COPY app.py .

# Chạy ứng dụng Python
CMD ["python", "app.py"]
