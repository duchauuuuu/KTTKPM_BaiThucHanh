package HeThongThuVien;

public class Book {
    private String id;
    private String title;
    private String author;
    private String genre;
    private boolean available;
    private String borrowedBy;

    public Book(String id, String title, String author, String genre) {
        this.id        = id;
        this.title     = title;
        this.author    = author;
        this.genre     = genre;
        this.available = true;
    }

    public String getType() { return "Sách"; }

    public String getId()       { return id; }
    public String getTitle()    { return title; }
    public String getAuthor()   { return author; }
    public String getGenre()    { return genre; }
    public boolean isAvailable(){ return available; }
    public String getBorrowedBy(){ return borrowedBy; }

    public void setAvailable(boolean available) { this.available = available; }
    public void setBorrowedBy(String name)       { this.borrowedBy = name; }

    @Override
    public String toString() {
        String status = available ? "Có sẵn" : "Đang mượn bởi: " + borrowedBy;
        return String.format("[%s] %-30s | Tác giả: %-15s | Thể loại: %-12s | %s",
            id, title, author, genre, status);
    }
}
