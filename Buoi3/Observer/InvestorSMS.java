package Observer;

public class InvestorSMS implements Observer {

    private String name;
    private String phoneNumber;

    public InvestorSMS(String name, String phoneNumber) {
        this.name        = name;
        this.phoneNumber = phoneNumber;
    }

    @Override
    public void update(String stockSymbol, double oldPrice, double newPrice) {
        double changePercent = (newPrice - oldPrice) / oldPrice * 100;
        String msg = String.format(
            "CK %s: gia moi %,.0f VND (%+.1f%%). - StockAlert",
            stockSymbol, newPrice, changePercent
        );
        System.out.printf("    💬 [SMS] Gửi tới %s (%s): \"%s\"%n",
            name, phoneNumber, msg);
    }

    @Override
    public String toString() {
        return "InvestorSMS{" + name + ", " + phoneNumber + "}";
    }
}
