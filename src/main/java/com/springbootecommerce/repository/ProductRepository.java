package com.springbootecommerce.repository;

import com.springbootecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The Interface ProductRepository.
 *
 * 
 * @version 1.0
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
