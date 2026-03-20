package Observer;

import java.util.ArrayList;
import java.util.List;

public class Stock implements Subject {

    private String symbol;
    private String companyName;
    private double currentPrice;

    private List<Observer> observers = new ArrayList<>();

    public Stock(String symbol, String companyName, double initialPrice) {
        this.symbol       = symbol;
        this.companyName  = companyName;
        this.currentPrice = initialPrice;
    }

    @Override
    public void registerObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
            System.out.printf("[%s] Đăng ký theo dõi thành công. Tổng số nhà đầu tư: %d%n",
                symbol, observers.size());
        }
    }

    @Override
    public void removeObserver(Observer observer) {
        boolean removed = observers.remove(observer);
        if (removed) {
            System.out.printf("[%s] Hủy đăng ký thành công. Còn lại: %d nhà đầu tư%n",
                symbol, observers.size());
        }
    }

    @Override
    public void notifyObservers(double oldPrice, double newPrice) {
        for (Observer observer : observers) {
            observer.update(symbol, oldPrice, newPrice);
        }
    }

    public void setPrice(double newPrice) {
        if (newPrice <= 0) {
            System.out.println("Giá không hợp lệ: " + newPrice);
            return;
        }
        double oldPrice = this.currentPrice;
        this.currentPrice = newPrice;

        double changePercent = ((newPrice - oldPrice) / oldPrice) * 100;
        String trend = newPrice > oldPrice ? "▲" : (newPrice < oldPrice ? "▼" : "─");

        System.out.printf("%n>>> [%s - %s] Giá thay đổi: %,.0f → %,.0f VND  %s %.2f%%%n",
            symbol, companyName, oldPrice, newPrice, trend, Math.abs(changePercent));
        System.out.println("    Đang thông báo tới " + observers.size() + " nhà đầu tư...");

        notifyObservers(oldPrice, newPrice);
    }

    public String getSymbol()      { return symbol; }
    public String getCompanyName() { return companyName; }
    public double getCurrentPrice(){ return currentPrice; }
}
