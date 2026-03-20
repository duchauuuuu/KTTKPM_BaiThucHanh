package HeThongThuVien;

import java.util.ArrayList;
import java.util.List;

public class Library {

    private static Library instance;

    private List<Book> books = new ArrayList<>();
    private List<LibraryObserver> observers = new ArrayList<>();

    private Library() {
        System.out.println("[Library] Khởi tạo thư viện duy nhất.");
    }

    public static Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    // ----------------------------------------------------------------
    // Observer management
    // ----------------------------------------------------------------

    public void registerObserver(LibraryObserver o)  { observers.add(o); }
    public void removeObserver(LibraryObserver o)    { observers.remove(o); }

    private void notifyObservers(String event, Book book) {
        for (LibraryObserver o : observers) {
            o.update(event, book);
        }
    }

    // ----------------------------------------------------------------
    // Quản lý sách
    // ----------------------------------------------------------------

    public void addBook(Book book) {
        books.add(book);
        notifyObservers("THEM_SACH", book);
    }

    public boolean borrowBook(String bookId, String userName) {
        for (Book book : books) {
            if (book.getId().equals(bookId)) {
                if (!book.isAvailable()) {
                    System.out.println("  Sách \"" + book.getTitle() + "\" hiện đang được mượn.");
                    return false;
                }
                book.setAvailable(false);
                book.setBorrowedBy(userName);
                notifyObservers("MUON_SACH", book);
                return true;
            }
        }
        System.out.println("  Không tìm thấy sách ID: " + bookId);
        return false;
    }

    public boolean returnBook(String bookId) {
        for (Book book : books) {
            if (book.getId().equals(bookId) && !book.isAvailable()) {
                book.setAvailable(true);
                book.setBorrowedBy(null);
                notifyObservers("TRA_SACH", book);
                return true;
            }
        }
        System.out.println("  Không tìm thấy sách đang mượn với ID: " + bookId);
        return false;
    }

    public List<Book> getAllBooks()       { return new ArrayList<>(books); }

    public List<Book> getAvailableBooks() {
        List<Book> result = new ArrayList<>();
        for (Book b : books) {
            if (b.isAvailable()) result.add(b);
        }
        return result;
    }
}
