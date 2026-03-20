package HeThongThuVien;

public class EBook extends Book {
    private String format;
    private double fileSizeMB;

    public EBook(String id, String title, String author, String genre, String format, double fileSizeMB) {
        super(id, title, author, genre);
        this.format     = format;
        this.fileSizeMB = fileSizeMB;
    }

    public String getFormat()    { return format; }
    public double getFileSizeMB(){ return fileSizeMB; }

    @Override
    public String getType() { return "Sách điện tử"; }

    @Override
    public String toString() {
        return super.toString() + String.format(" | %s (%.1f MB)", format, fileSizeMB);
    }
}
