package HeThongThuVien;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        // ================================================================
        // 1. SINGLETON — Lấy thể hiện duy nhất của thư viện
        // ================================================================
        separator("1. SINGLETON — Khởi tạo thư viện");

        Library library1 = Library.getInstance();
        Library library2 = Library.getInstance();
        System.out.println("library1 == library2 ? " + (library1 == library2));

        Library library = Library.getInstance();

        // ================================================================
        // 2. OBSERVER — Đăng ký nhân viên và độc giả theo dõi
        // ================================================================
        separator("2. OBSERVER — Đăng ký theo dõi");

        LibrarianNotifier thuThu1 = new LibrarianNotifier("Minh");
        LibrarianNotifier thuThu2 = new LibrarianNotifier("Lan");
        MemberNotifier   docGia1 = new MemberNotifier("Alice", "Lập trình");
        MemberNotifier   docGia2 = new MemberNotifier("Bob",   "Khoa học");

        library.registerObserver(thuThu1);
        library.registerObserver(thuThu2);
        library.registerObserver(docGia1);
        library.registerObserver(docGia2);
        System.out.println("Đã đăng ký: 2 thủ thư + 2 độc giả.");

        // ================================================================
        // 3. FACTORY METHOD — Tạo sách và thêm vào thư viện
        // ================================================================
        separator("3. FACTORY METHOD — Thêm sách vào thư viện");

        BookFactory physicalFactory = new PhysicalBookFactory();
        BookFactory ebookFactory    = new EBookFactory();
        BookFactory audioFactory    = new AudioBookFactory();

        Book b1 = physicalFactory.orderBook("B001", "Lập trình Java cơ bản",  "Nguyen Van A", "Lập trình", "420");
        Book b2 = physicalFactory.orderBook("B002", "Design Patterns",         "Gang of Four", "Lập trình", "395");
        Book b3 = ebookFactory.orderBook   ("B003", "Vũ trụ trong vỏ hạt dẻ", "S. Hawking",  "Khoa học",  "PDF:8.5");
        Book b4 = ebookFactory.orderBook   ("B004", "Đắc Nhân Tâm",           "Dale Carnegie","Kỹ năng",   "EPUB:2.1");
        Book b5 = audioFactory.orderBook   ("B005", "Nhà Giả Kim",             "Paulo Coelho", "Văn học",   "320:Tran Thi B");

        System.out.println();
        library.addBook(b1);
        library.addBook(b2);
        library.addBook(b3);
        library.addBook(b4);
        library.addBook(b5);

        // ================================================================
        // 4. Hiển thị danh sách sách có sẵn
        // ================================================================
        separator("DANH SÁCH SÁCH CÓ SẴN");

        List<Book> available = library.getAvailableBooks();
        System.out.println("Tổng số sách có sẵn: " + available.size());
        for (Book b : available) {
            System.out.println("  " + b);
        }

        // ================================================================
        // 5. STRATEGY — Tìm kiếm sách
        // ================================================================
        separator("5. STRATEGY — Tìm kiếm sách");

        SearchContext searchCtx = new SearchContext();

        searchCtx.setStrategy(new SearchByTitle());
        printSearchResult(searchCtx.search(library.getAllBooks(), "java"), "java");

        searchCtx.setStrategy(new SearchByAuthor());
        printSearchResult(searchCtx.search(library.getAllBooks(), "Coelho"), "Coelho");

        searchCtx.setStrategy(new SearchByGenre());
        printSearchResult(searchCtx.search(library.getAllBooks(), "Lập trình"), "Lập trình");

        // ================================================================
        // 6. OBSERVER — Mượn và trả sách (kích hoạt thông báo)
        // ================================================================
        separator("6. OBSERVER — Mượn sách");

        System.out.println("Alice mượn sách B001:");
        library.borrowBook("B001", "Alice");

        System.out.println("\nBob mượn sách B003:");
        library.borrowBook("B003", "Bob");

        System.out.println("\nThử mượn lại B001 (đang bị mượn):");
        library.borrowBook("B001", "Carol");

        separator("OBSERVER — Trả sách");

        System.out.println("Alice trả sách B001:");
        library.returnBook("B001");

        // ================================================================
        // 7. DECORATOR — Mượn sách với tính năng mở rộng
        // ================================================================
        separator("7. DECORATOR — Mượn sách với tính năng bổ sung");

        Book targetBook = library.getAvailableBooks().get(0);

        BorrowService basic = new BasicBorrowService();
        System.out.println("Cơ bản    : " + basic.borrow(targetBook, "Carol") +
            "  (Hạn: " + basic.getDurationDays() + " ngày)");

        BorrowService extended = new ExtendTimeDecorator(basic, 7);
        System.out.println("Gia hạn   : " + extended.borrow(targetBook, "Carol") +
            "  (Hạn: " + extended.getDurationDays() + " ngày)");

        BorrowService special = new SpecialEditionDecorator(basic, "Chữ nổi Braille");
        System.out.println("Đặc biệt  : " + special.borrow(targetBook, "Carol") +
            "  (Hạn: " + special.getDurationDays() + " ngày)");

        BorrowService extendedSpecial = new SpecialEditionDecorator(
            new ExtendTimeDecorator(basic, 14), "Bản dịch tiếng Anh"
        );
        System.out.println("Kết hợp   : " + extendedSpecial.borrow(targetBook, "Carol") +
            "  (Hạn: " + extendedSpecial.getDurationDays() + " ngày)");

        // ================================================================
        // 8. Danh sách cuối cùng
        // ================================================================
        separator("DANH SÁCH TOÀN BỘ SÁCH");

        for (Book b : library.getAllBooks()) {
            System.out.println("  " + b);
        }
    }

    private static void printSearchResult(List<Book> results, String keyword) {
        System.out.printf("  Kết quả tìm \"%s\": %d sách%n", keyword, results.size());
        for (Book b : results) {
            System.out.println("    → " + b.getTitle() + " (" + b.getType() + ")");
        }
    }

    private static void separator(String title) {
        System.out.println();
        System.out.println("══════════════════════════════════════════════════════════");
        System.out.println("  " + title);
        System.out.println("══════════════════════════════════════════════════════════");
    }
}
