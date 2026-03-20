package HeThongThuVien;

public abstract class BookFactory {

    public abstract Book createBook(String id, String title, String author, String genre, String extra);

    public Book orderBook(String id, String title, String author, String genre, String extra) {
        Book book = createBook(id, title, author, genre, extra);
        System.out.println("  [Factory] Đã tạo " + book.getType() + ": \"" + title + "\"");
        return book;
    }
}
