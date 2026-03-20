package Observer;

public interface Observer {
    void update(String stockSymbol, double oldPrice, double newPrice);
}
