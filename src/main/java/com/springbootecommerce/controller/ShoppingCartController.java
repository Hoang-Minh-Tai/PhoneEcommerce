package com.springbootecommerce.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.springbootecommerce.dto.AddCartItemDto;
import com.springbootecommerce.dto.UpdateCartItemDto;
import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.ShoppingCartItem;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.ProductRepository;
import com.springbootecommerce.repository.ShoppingCartItemRepository;
import com.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasAuthority('USER')")
public class ShoppingCartController {
    @Autowired
    private ShoppingCartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShoppingCartItemRepository shoppingCartItemRepository;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getShoppingCartById(@PathVariable long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        Optional<ShoppingCartItem> optionalCartItem = cartItemRepository.findById(id);

        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found.");
        }
        ShoppingCartItem item = optionalCartItem.get();

        // check if the cart item belongs to the user
        if (!item.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }
        return ResponseEntity.ok().body(item);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCartItem(@RequestBody AddCartItemDto addCartItemDto, Authentication authentication) {
        // get the authenticated user
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        Optional<Product> product = productRepository.findById(addCartItemDto.getProductId());
        if (product.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found.");
        }

        ShoppingCartItem existedCartItem = shoppingCartItemRepository.findByUserAndProduct(user,product.get());
        if (existedCartItem != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product is already in shopping cart.");
        }

        ShoppingCartItem item = new ShoppingCartItem();
        item.setUser(user);
        item.setProduct(product.get());
        item.setQuantity(addCartItemDto.getQuantity());
        item.setCreatedAt(new Date());

        cartItemRepository.save(item);
        // return the created item with a 201 status code
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCartItem(@PathVariable Long id, Authentication authentication) {
        // get the authenticated user
        String username = authentication.getName();

        // check if the cart item exists
        Optional<ShoppingCartItem> optionalCartItem = cartItemRepository.findById(id);
        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found.");
        }

        ShoppingCartItem item = optionalCartItem.get();

        // check if the cart item belongs to the user
        if (!item.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }

        // delete the cart item
        cartItemRepository.delete(item);

        // return 204 No Content
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Cart item deleted successfully.");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long id,
                                            @RequestBody UpdateCartItemDto updateCartItemDto, Authentication authentication) {

        // get the authenticated user
        String username = authentication.getName();

        // check if the cart item exists
        Optional<ShoppingCartItem> optionalCartItem = cartItemRepository.findById(id);
        if (optionalCartItem.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart item not found.");
        }

        ShoppingCartItem item = optionalCartItem.get();

        // check if the cart item belongs to the user
        if (!item.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }

        // update the cart item
        item.setQuantity(updateCartItemDto.getQuantity());
        cartItemRepository.save(item);

        // return the updated cart item
        return ResponseEntity.ok(item);
    }


    @GetMapping()
    public List<ShoppingCartItem> getUserCart(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        List<ShoppingCartItem> cartItems = cartItemRepository.findByUser(user);
        return cartItems;
    }
}
