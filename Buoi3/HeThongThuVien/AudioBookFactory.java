package HeThongThuVien;

public class AudioBookFactory extends BookFactory {

    @Override
    public Book createBook(String id, String title, String author, String genre, String extra) {
        // extra = "360:Nguyen Van A" (phút:người đọc)
        String[] parts = extra.split(":");
        int minutes    = Integer.parseInt(parts[0]);
        String narrator = parts[1];
        return new AudioBook(id, title, author, genre, minutes, narrator);
    }
}
