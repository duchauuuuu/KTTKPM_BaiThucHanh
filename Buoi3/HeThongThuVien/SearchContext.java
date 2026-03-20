package HeThongThuVien;

import java.util.List;

public class SearchContext {
    private SearchStrategy strategy;

    public void setStrategy(SearchStrategy strategy) {
        this.strategy = strategy;
        System.out.println("  [Search] Chiến lược: " + strategy.getStrategyName());
    }

    public List<Book> search(List<Book> books, String keyword) {
        if (strategy == null) {
            throw new IllegalStateException("Chưa chọn chiến lược tìm kiếm.");
        }
        return strategy.search(books, keyword);
    }
}
