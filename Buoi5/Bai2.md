# Các Kỹ Thuật Phân Mảnh Cơ Sở Dữ Liệu (Database Partitioning)

---

## 1. Phân Mảnh Ngang (Horizontal Partitioning - Row)

### Khái niệm

Phân mảnh ngang là kỹ thuật chia dữ liệu theo **hàng (row)** thành nhiều bảng khác nhau. Các bảng này có cấu trúc (schema) hoàn toàn giống nhau nhưng chứa các tập hợp bản ghi khác nhau dựa trên một tiêu chí phân loại.

### Ví dụ minh họa

Hệ thống có bảng `User` với số lượng bản ghi lớn, thực hiện tách thành hai bảng dựa trên giới tính:

- `table_user_01`: Chứa dữ liệu người dùng **Nam**.
- `table_user_02`: Chứa dữ liệu người dùng **Nữ**.

### Truy vấn SQL

```sql
-- Truy vấn từ bảng Nam
SELECT * FROM table_user_01 WHERE gender = 'nam';

-- Truy vấn từ bảng Nữ
SELECT * FROM table_user_02 WHERE gender = 'nu';
```

### Logic xử lý trong Spring Boot

```java
// Logic lưu dữ liệu
if (user.getGender().equals("nam")) {
    userRepository01.save(user);
} else {
    userRepository02.save(user);
}

// Logic truy vấn dữ liệu
public List<User> getUsers(String gender) {
    if (gender.equals("nam")) {
        return userRepository01.findAll();
    } else {
        return userRepository02.findAll();
    }
}
```

### Lợi ích

- Giảm số lượng bản ghi trên mỗi bảng, giúp việc đánh chỉ mục (index) hiệu quả hơn.
- Tốc độ truy vấn nhanh hơn do không phải quét qua toàn bộ tập dữ liệu khổng lồ.
- Khả năng mở rộng (scale) tốt khi dữ liệu tăng trưởng theo thời gian.

---

## 2. Phân Mảnh Dọc (Vertical Partitioning - Column)

### Khái niệm

Phân mảnh dọc là kỹ thuật chia các **cột (column)** của một bảng gốc thành nhiều bảng nhỏ hơn. Mỗi bảng sẽ giữ một phần thông tin của đối tượng và thường liên kết với nhau qua **khóa chính (ID)**.

### Ví dụ minh họa

Bảng `User` ban đầu gồm các cột: `id`, `name`, `email`, `address`, `avatar`. Thực hiện tách thành:

- `user_basic`: Chứa `id`, `name`, `email` — Thông tin cơ bản, truy cập thường xuyên.
- `user_detail`: Chứa `id`, `address`, `avatar` — Thông tin chi tiết, dữ liệu nặng.

### Truy vấn SQL

```sql
-- Lấy thông tin cơ bản
SELECT * FROM user_basic WHERE id = 1;

-- Lấy thông tin chi tiết (ảnh, địa chỉ)
SELECT * FROM user_detail WHERE id = 1;
```

### Logic xử lý trong Spring Boot

```java
// Truy vấn từ hai Repository riêng biệt
UserBasic basic = userBasicRepo.findById(id);
UserDetail detail = userDetailRepo.findById(id);
```

### Lợi ích

- Tối ưu hóa tốc độ truy vấn khi chỉ cần lấy các thông tin cơ bản.
- Giảm tải cho bộ nhớ (RAM/IO) do không phải load các cột dữ liệu nặng (như ảnh, text dài) khi không cần thiết.
- Tăng hiệu suất bộ nhớ đệm (Cache).

---

## 3. Phân Mảnh Theo Chức Năng (Functional Partitioning - Logic)

### Khái niệm

Phân mảnh theo chức năng là việc chia cơ sở dữ liệu dựa trên các **nhóm chức năng hoặc nghiệp vụ** riêng biệt của hệ thống.

### Ví dụ minh họa

Hệ thống được tách thành các cơ sở dữ liệu độc lập:

- `user_db`: Chuyên quản lý người dùng.
- `order_db`: Chuyên quản lý đơn hàng.
- `payment_db`: Chuyên quản lý thanh toán.

Hoặc tách theo phân quyền người dùng:

- **Database 1**: Dành cho người dùng thông thường.
- **Database 2**: Dành cho quản trị viên (Admin).

### Logic xử lý trong Spring Boot

```java
// Điều hướng Database (DataSource) dựa trên logic nghiệp vụ
if (user.isAdmin()) {
    useDataSource(DB2); // Kết nối DB dành cho Admin
} else {
    useDataSource(DB1); // Kết nối DB dành cho User thường
}
```

### Lợi ích

- Dễ dàng quản lý và bảo trì hệ thống theo từng module.
- Tách biệt hoàn toàn nghiệp vụ, tránh việc một module gặp sự cố ảnh hưởng đến toàn bộ hệ thống.
- Cho phép mở rộng (scale) độc lập cho từng phần (ví dụ: chỉ cần nâng cấp server chứa database đơn hàng).
