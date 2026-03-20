package Observer;

public class InvestorApp implements Observer {

    private String name;
    private String deviceId;

    public InvestorApp(String name, String deviceId) {
        this.name     = name;
        this.deviceId = deviceId;
    }

    @Override
    public void update(String stockSymbol, double oldPrice, double newPrice) {
        double change        = newPrice - oldPrice;
        double changePercent = change / oldPrice * 100;
        String arrow         = change >= 0 ? "🔴" : "🟢";

        System.out.printf("    📱 [APP] Push → %s (device: %s):%n" +
            "       %s %s  %+,.0f VND (%+.2f%%)  |  Giá: %,.0f VND%n",
            name, deviceId, arrow, stockSymbol, change, changePercent, newPrice);
    }

    @Override
    public String toString() {
        return "InvestorApp{" + name + ", " + deviceId + "}";
    }
}
