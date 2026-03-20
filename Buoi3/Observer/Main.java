package Observer;

public class Main {

    public static void main(String[] args) {

        Stock vnm = new Stock("VNM", "Vinamilk",  68_000);
        Stock fpt = new Stock("FPT", "FPT Corp",  115_000);

        InvestorEmail alice = new InvestorEmail("Alice", "alice@gmail.com", 2.0);
        InvestorApp   bob   = new InvestorApp  ("Bob",   "BOB-DEVICE-001");
        InvestorSMS   carol = new InvestorSMS  ("Carol", "0912345678");
        InvestorApp   dave  = new InvestorApp  ("Dave",  "DAVE-DEVICE-007");

        separator("ĐĂNG KÝ THEO DÕI CỔ PHIẾU");

        System.out.println("-- Cổ phiếu VNM --");
        vnm.registerObserver(alice);
        vnm.registerObserver(bob);
        vnm.registerObserver(carol);

        System.out.println("\n-- Cổ phiếu FPT --");
        fpt.registerObserver(bob);
        fpt.registerObserver(dave);

        separator("BIẾN ĐỘNG GIÁ CỔ PHIẾU VNM");
        vnm.setPrice(69_500);
        vnm.setPrice(67_000);
        vnm.setPrice(67_200);

        separator("BIẾN ĐỘNG GIÁ CỔ PHIẾU FPT");
        fpt.setPrice(120_000);
        fpt.setPrice(113_000);

        separator("CAROL HỦY ĐĂNG KÝ THEO DÕI VNM");
        vnm.removeObserver(carol);
        vnm.setPrice(70_000);

        separator("DAVE ĐĂNG KÝ THÊM THEO DÕI VNM");
        vnm.registerObserver(dave);
        vnm.setPrice(71_500);

        separator("TRẠNG THÁI HIỆN TẠI");
        System.out.printf("Giá hiện tại VNM (%s): %,.0f VND%n",
            vnm.getCompanyName(), vnm.getCurrentPrice());
        System.out.printf("Giá hiện tại FPT (%s): %,.0f VND%n",
            fpt.getCompanyName(), fpt.getCurrentPrice());
    }

    private static void separator(String title) {
        System.out.println();
        System.out.println("══════════════════════════════════════════════");
        System.out.println("  " + title);
        System.out.println("══════════════════════════════════════════════");
    }
}
