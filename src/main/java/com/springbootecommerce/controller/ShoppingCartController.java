package com.springbootecommerce.controller;

import java.util.List;

import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.ShoppingCart;
import com.springbootecommerce.model.ShoppingCartItem;
import com.springbootecommerce.repository.ProductRepository;
import com.springbootecommerce.repository.ShoppingCartItemRepository;
import com.springbootecommerce.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shoppingcarts")
@CrossOrigin("*")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ShoppingCartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{id}")
    public ShoppingCart getShoppingCartById(@PathVariable long id) {
        return shoppingCartRepository.findById(id).orElse(null);
    }

    @PostMapping("/{id}/items")
    public ShoppingCartItem addCartItem(@PathVariable long id, @RequestBody ShoppingCartItem cartItem) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(id).orElse(null);

        if (shoppingCart == null) {
            throw new RuntimeException("Shopping cart with id " + id + " not found.");
        }

        Product product = productRepository.findById(cartItem.getProduct().getId()).orElse(null);

        if (product == null) {
            throw new RuntimeException("Product with id " + cartItem.getProduct().getId() + " not found.");
        }

        cartItem.setProduct(product);
        cartItem.setShoppingCart(shoppingCart);

        cartItemRepository.save(cartItem);

        return cartItem;
    }

    @DeleteMapping("/items/{id}")
    public void deleteCartItem(@PathVariable long id) {
        cartItemRepository.deleteById(id);
    }

    @PutMapping("/items/{id}")
    public ShoppingCartItem updateCartItem(@PathVariable long id, @RequestBody ShoppingCartItem cartItem) {
        ShoppingCartItem existingCartItem = cartItemRepository.findById(id).orElse(null);

        if (existingCartItem == null) {
            throw new RuntimeException("Cart item with id " + id + " not found.");
        }

        Product product = productRepository.findById(cartItem.getProduct().getId()).orElse(null);

        if (product == null) {
            throw new RuntimeException("Product with id " + cartItem.getProduct().getId() + " not found.");
        }

        existingCartItem.setProduct(product);
        existingCartItem.setQuantity(cartItem.getQuantity());

        cartItemRepository.save(existingCartItem);

        return existingCartItem;
    }

    @GetMapping("/{id}/items")
    public List<ShoppingCartItem> getCartItemsByShoppingCartId(@PathVariable long id) {
        return cartItemRepository.findByShoppingCartId(id);
    }

    @GetMapping("/{id}/total")
    public double calculateTotal(@PathVariable long id) {
        List<ShoppingCartItem> cartItems = cartItemRepository.findByShoppingCartId(id);
        double total = 0;

        for (ShoppingCartItem cartItem : cartItems) {
            total += cartItem.getProduct().getPrice().doubleValue() * cartItem.getQuantity();
        }

        return total;
    }

    @DeleteMapping("/{id}/items")
    public void clearCart(@PathVariable long id) {
        List<ShoppingCartItem> cartItems = cartItemRepository.findByShoppingCartId(id);

        for (ShoppingCartItem cartItem : cartItems) {
            cartItemRepository.delete(cartItem);
        }
    }
}
