package HeThongThuVien;

public class EBookFactory extends BookFactory {

    @Override
    public Book createBook(String id, String title, String author, String genre, String extra) {
        // extra = "PDF:5.2" hoặc "EPUB:3.0"
        String[] parts  = extra.split(":");
        String format   = parts[0];
        double sizeMB   = Double.parseDouble(parts[1]);
        return new EBook(id, title, author, genre, format, sizeMB);
    }
}
