package HeThongThuVien;

public class SpecialEditionDecorator extends BorrowDecorator {
    private String feature;

    public SpecialEditionDecorator(BorrowService service, String feature) {
        super(service);
        this.feature = feature;
    }

    @Override
    public String borrow(Book book, String userName) {
        return wrapped.borrow(book, userName)
            + String.format(" [+Phiên bản đặc biệt: %s]", feature);
    }

    @Override
    public int getDurationDays() { return wrapped.getDurationDays(); }
}
