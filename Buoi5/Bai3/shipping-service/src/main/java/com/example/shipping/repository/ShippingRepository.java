package com.example.shipping.repository;

import com.example.shipping.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Long> {
    List<Shipping> findByOrderId(Long orderId);
}
