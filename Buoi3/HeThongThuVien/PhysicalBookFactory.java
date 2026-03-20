package HeThongThuVien;

public class PhysicalBookFactory extends BookFactory {

    @Override
    public Book createBook(String id, String title, String author, String genre, String extra) {
        int pages = Integer.parseInt(extra);
        return new PhysicalBook(id, title, author, genre, pages);
    }
}
