package com.example.shipping.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shippings")
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String carrier = "GHTK";

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(nullable = false)
    private String status = "PREPARING";

    @Column(name = "shipped_at")
    private LocalDateTime shippedAt = LocalDateTime.now();

    public Shipping() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCarrier() { return carrier; }
    public void setCarrier(String carrier) { this.carrier = carrier; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getShippedAt() { return shippedAt; }
    public void setShippedAt(LocalDateTime shippedAt) { this.shippedAt = shippedAt; }
}
