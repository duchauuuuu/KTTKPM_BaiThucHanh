package HeThongThuVien;

public class BasicBorrowService implements BorrowService {

    private static final int DEFAULT_DAYS = 14;

    @Override
    public String borrow(Book book, String userName) {
        return String.format("%s mượn \"%s\" trong %d ngày", userName, book.getTitle(), getDurationDays());
    }

    @Override
    public int getDurationDays() { return DEFAULT_DAYS; }
}
