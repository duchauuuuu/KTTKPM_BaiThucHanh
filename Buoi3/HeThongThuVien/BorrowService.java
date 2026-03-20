package HeThongThuVien;

public interface BorrowService {
    String borrow(Book book, String userName);
    int getDurationDays();
}
