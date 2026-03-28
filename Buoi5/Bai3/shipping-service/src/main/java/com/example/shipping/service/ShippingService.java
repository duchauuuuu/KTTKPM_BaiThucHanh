package com.example.shipping.service;

import com.example.shipping.model.Shipping;
import com.example.shipping.repository.ShippingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ShippingService {

    private final ShippingRepository shippingRepository;

    public ShippingService(ShippingRepository shippingRepository) {
        this.shippingRepository = shippingRepository;
    }

    public List<Shipping> getAllShippings() {
        return shippingRepository.findAll();
    }

    public List<Shipping> getShippingsByOrderId(Long orderId) {
        return shippingRepository.findByOrderId(orderId);
    }

    public Shipping createShipping(Map<String, Object> request) {
        Shipping shipping = new Shipping();
        shipping.setOrderId(Long.valueOf(request.get("orderId").toString()));
        shipping.setAddress(request.getOrDefault("address", "Unknown").toString());
        shipping.setCarrier(request.getOrDefault("carrier", "GHTK").toString());
        shipping.setTrackingNumber("TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        shipping.setStatus("PREPARING");
        return shippingRepository.save(shipping);
    }

    public Shipping updateShippingStatus(Long id, String status) {
        Shipping shipping = shippingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipping not found: " + id));
        shipping.setStatus(status);
        return shippingRepository.save(shipping);
    }

    public Shipping getShippingById(Long id) {
        return shippingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipping not found: " + id));
    }
}
