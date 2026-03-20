package HeThongThuVien;

import java.util.ArrayList;
import java.util.List;

public class SearchByTitle implements SearchStrategy {

    @Override
    public List<Book> search(List<Book> books, String keyword) {
        List<Book> result = new ArrayList<>();
        for (Book b : books) {
            if (b.getTitle().toLowerCase().contains(keyword.toLowerCase())) {
                result.add(b);
            }
        }
        return result;
    }

    @Override
    public String getStrategyName() { return "Tìm theo tên sách"; }
}
