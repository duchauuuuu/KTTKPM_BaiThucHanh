package com.example.shipping.controller;

import com.example.shipping.model.Shipping;
import com.example.shipping.service.ShippingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shippings")
@CrossOrigin(origins = "*")
public class ShippingController {

    private final ShippingService shippingService;

    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping
    public ResponseEntity<List<Shipping>> getAllShippings() {
        return ResponseEntity.ok(shippingService.getAllShippings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipping> getShippingById(@PathVariable Long id) {
        return ResponseEntity.ok(shippingService.getShippingById(id));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<Shipping>> getShippingsByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(shippingService.getShippingsByOrderId(orderId));
    }

    @PostMapping
    public ResponseEntity<Shipping> createShipping(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(shippingService.createShipping(request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Shipping> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(shippingService.updateShippingStatus(id, status));
    }
}
