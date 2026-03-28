package com.example.order.service;

import com.example.order.model.Order;
import com.example.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Value("${payment.service.url}")
    private String paymentServiceUrl;

    @Value("${shipping.service.url}")
    private String shippingServiceUrl;

    public OrderService(OrderRepository orderRepository, RestTemplate restTemplate) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }

    public Order createOrder(Order order) {
        order.setStatus("PENDING");
        Order saved = orderRepository.save(order);

        try {
            // Gọi Payment Service để xử lý thanh toán
            Map<String, Object> paymentRequest = new HashMap<>();
            paymentRequest.put("orderId", saved.getId());
            paymentRequest.put("amount", saved.getTotalAmount());
            paymentRequest.put("method", "CREDIT_CARD");

            restTemplate.postForObject(paymentServiceUrl + "/api/payments", paymentRequest, Map.class);

            // Gọi Shipping Service để tạo vận chuyển
            Map<String, Object> shippingRequest = new HashMap<>();
            shippingRequest.put("orderId", saved.getId());
            shippingRequest.put("address", "123 Nguyen Trai, HCM");
            shippingRequest.put("carrier", "GHTK");

            restTemplate.postForObject(shippingServiceUrl + "/api/shippings", shippingRequest, Map.class);

            saved.setStatus("CONFIRMED");
        } catch (Exception e) {
            saved.setStatus("FAILED");
        }

        return orderRepository.save(saved);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
