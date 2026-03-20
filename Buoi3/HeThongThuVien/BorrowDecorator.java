package HeThongThuVien;

public abstract class BorrowDecorator implements BorrowService {
    protected BorrowService wrapped;

    public BorrowDecorator(BorrowService service) {
        this.wrapped = service;
    }
}
