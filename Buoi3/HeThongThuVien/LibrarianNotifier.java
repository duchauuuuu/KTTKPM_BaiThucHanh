package HeThongThuVien;

public class LibrarianNotifier implements LibraryObserver {
    private String name;

    public LibrarianNotifier(String name) {
        this.name = name;
    }

    @Override
    public void update(String event, Book book) {
        switch (event) {
            case "THEM_SACH":
                System.out.printf("  [Thủ thư - %s] Sách mới \"%s\" (%s) vừa được thêm vào thư viện.%n",
                    name, book.getTitle(), book.getType());
                break;
            case "MUON_SACH":
                System.out.printf("  [Thủ thư - %s] Sách \"%s\" được mượn bởi %s.%n",
                    name, book.getTitle(), book.getBorrowedBy());
                break;
            case "TRA_SACH":
                System.out.printf("  [Thủ thư - %s] Sách \"%s\" đã được trả lại.%n",
                    name, book.getTitle());
                break;
        }
    }
}
