package HeThongThuVien;

public class MemberNotifier implements LibraryObserver {
    private String memberName;
    private String interestedGenre;

    public MemberNotifier(String memberName, String interestedGenre) {
        this.memberName      = memberName;
        this.interestedGenre = interestedGenre;
    }

    @Override
    public void update(String event, Book book) {
        if (event.equals("THEM_SACH") && book.getGenre().equalsIgnoreCase(interestedGenre)) {
            System.out.printf("  [Độc giả - %s] Sách mới \"%s\" thuộc thể loại \"%s\" mà bạn quan tâm!%n",
                memberName, book.getTitle(), interestedGenre);
        }
        if (event.equals("TRA_SACH") && !book.getGenre().isEmpty()) {
            System.out.printf("  [Độc giả - %s] Sách \"%s\" vừa được trả lại — có thể mượn ngay!%n",
                memberName, book.getTitle());
        }
    }
}
