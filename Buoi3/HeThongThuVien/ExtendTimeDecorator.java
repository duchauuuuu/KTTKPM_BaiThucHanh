package HeThongThuVien;

public class ExtendTimeDecorator extends BorrowDecorator {
    private int extraDays;

    public ExtendTimeDecorator(BorrowService service, int extraDays) {
        super(service);
        this.extraDays = extraDays;
    }

    @Override
    public String borrow(Book book, String userName) {
        return wrapped.borrow(book, userName)
            + String.format(" [+Gia hạn %d ngày → tổng %d ngày]", extraDays, getDurationDays());
    }

    @Override
    public int getDurationDays() { return wrapped.getDurationDays() + extraDays; }
}
