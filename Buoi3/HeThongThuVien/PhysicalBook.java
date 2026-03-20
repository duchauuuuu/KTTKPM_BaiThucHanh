package HeThongThuVien;

public class PhysicalBook extends Book {
    private int pages;

    public PhysicalBook(String id, String title, String author, String genre, int pages) {
        super(id, title, author, genre);
        this.pages = pages;
    }

    public int getPages() { return pages; }

    @Override
    public String getType() { return "Sách giấy"; }

    @Override
    public String toString() {
        return super.toString() + String.format(" | %d trang", pages);
    }
}
