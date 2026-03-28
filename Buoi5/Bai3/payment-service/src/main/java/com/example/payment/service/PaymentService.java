package com.example.payment.service;

import com.example.payment.model.Payment;
import com.example.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<Payment> getPaymentsByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    public Payment processPayment(Map<String, Object> request) {
        Payment payment = new Payment();
        payment.setOrderId(Long.valueOf(request.get("orderId").toString()));
        payment.setAmount(new BigDecimal(request.get("amount").toString()));
        payment.setMethod(request.getOrDefault("method", "CREDIT_CARD").toString());
        payment.setStatus("SUCCESS");
        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + id));
    }
}
