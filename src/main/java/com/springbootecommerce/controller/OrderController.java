package com.springbootecommerce.controller;

import java.util.Date;
import java.util.List;

import com.springbootecommerce.model.*;
import com.springbootecommerce.repository.DiscountRepository;
import com.springbootecommerce.repository.ShoppingCartItemRepository;
import com.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springbootecommerce.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;
    @Autowired
    private DiscountRepository discountRepository;

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Order getOrderById(@PathVariable long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public List<Order> addOrder(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        // Find all shopping cart items in the user's shopping cart
        List<ShoppingCartItem> cartItems = shoppingCartItemRepository.findByUser(user);

        double totalPrice = 0;
        for (ShoppingCartItem item : cartItems) {
            Product product = item.getProduct();

            // Check if there's a discount for this product
            Discount discount = discountRepository.findByProduct(product).orElse(null);

            double price = product.getPrice();
            if (discount != null && (discount.getExpiredAt() == null || discount.getExpiredAt().after(new Date()))) {
                price = price * (1 - discount.getDiscount() / 100d);
            }

            totalPrice += price * item.getQuantity();
        }

        return orderRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public List<Order> deleteOrder(@PathVariable long id) {
        orderRepository.deleteById(id);
        return orderRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public List<Order> updateOrder(@PathVariable long id, @RequestBody Order order) {


        return orderRepository.findAll();
    }
}
