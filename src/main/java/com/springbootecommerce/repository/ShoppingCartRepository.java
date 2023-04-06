package com.springbootecommerce.repository;

import com.springbootecommerce.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The Interface ShoppingCartRepository.
 *
 * @author devrobot
 * @version 1.0
 */
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

}
