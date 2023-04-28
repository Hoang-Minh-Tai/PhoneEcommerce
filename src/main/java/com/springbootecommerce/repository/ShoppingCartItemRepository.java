package com.springbootecommerce.repository;

import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.ShoppingCartItem;
import com.springbootecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * The Interface ShoppingCartItemRepository.
 *
 * 
 * @version 1.0
 */
public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
    List<ShoppingCartItem> findByUser(User user);
    ShoppingCartItem findByUserAndProduct(User user, Product product);
}
