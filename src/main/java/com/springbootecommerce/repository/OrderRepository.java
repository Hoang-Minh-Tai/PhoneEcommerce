package com.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootecommerce.model.Order;

/**
 * The Interface ProductRepository.
 *
 * 
 * @version 1.0
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
}
