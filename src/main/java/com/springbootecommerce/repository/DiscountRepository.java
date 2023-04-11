package com.springbootecommerce.repository;

import com.springbootecommerce.model.Discount;
import com.springbootecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByProduct(Product product);
}
