package HeThongThuVien;

public class AudioBook extends Book {
    private int durationMinutes;
    private String narrator;

    public AudioBook(String id, String title, String author, String genre, int durationMinutes, String narrator) {
        super(id, title, author, genre);
        this.durationMinutes = durationMinutes;
        this.narrator        = narrator;
    }

    public int getDurationMinutes() { return durationMinutes; }
    public String getNarrator()     { return narrator; }

    @Override
    public String getType() { return "Sách nói"; }

    @Override
    public String toString() {
        return super.toString() + String.format(" | %d phút | Đọc bởi: %s", durationMinutes, narrator);
    }
}
