package Observer;

public class InvestorEmail implements Observer {

    private String name;
    private String email;
    private double alertThreshold;

    public InvestorEmail(String name, String email, double alertThreshold) {
        this.name           = name;
        this.email          = email;
        this.alertThreshold = alertThreshold;
    }

    @Override
    public void update(String stockSymbol, double oldPrice, double newPrice) {
        double changePercent = Math.abs((newPrice - oldPrice) / oldPrice * 100);

        if (changePercent >= alertThreshold) {
            String direction = newPrice > oldPrice ? "TĂNG" : "GIẢM";
            System.out.printf("    📧 [EMAIL] Gửi tới %s <%s>:%n" +
                "       Cổ phiếu %s %s %.2f%% | Giá mới: %,.0f VND%n",
                name, email, stockSymbol, direction, changePercent, newPrice);
        } else {
            System.out.printf("    📧 [EMAIL] %s: Biến động %.2f%% < ngưỡng %.1f%% → Bỏ qua.%n",
                name, changePercent, alertThreshold);
        }
    }

    @Override
    public String toString() {
        return "InvestorEmail{" + name + ", " + email + "}";
    }
}
