package com.springbootecommerce.controller;

import com.springbootecommerce.model.Discount;
import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.ShoppingCartItem;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.DiscountRepository;
import com.springbootecommerce.repository.ShoppingCartItemRepository;
import com.springbootecommerce.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final ShoppingCartItemRepository shoppingCartItemRepository;
    private final UserRepository userRepository;
    private final DiscountRepository discountRepository;

    public PurchaseController(ShoppingCartItemRepository shoppingCartItemRepository, UserRepository userRepository, DiscountRepository discountRepository) {
        this.shoppingCartItemRepository = shoppingCartItemRepository;
        this.userRepository = userRepository;
        this.discountRepository = discountRepository;
    }

    @PostMapping()
    public ResponseEntity<BigDecimal> makePurchase(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        // Find all shopping cart items in the user's shopping cart
        List<ShoppingCartItem> cartItems = shoppingCartItemRepository.findByUser(user);

        BigDecimal totalPrice = new BigDecimal(0);
        for (ShoppingCartItem item : cartItems) {
            Product product = item.getProduct();

            // Check if there's a discount for this product
            Discount discount = discountRepository.findByProduct(product).orElse(null);

            BigDecimal price = product.getPrice();
            if (discount != null && (discount.getExpiredAt() == null || discount.getExpiredAt().after(new Date())) ){
                price = price.multiply(BigDecimal.valueOf(1 - discount.getDiscount().doubleValue()/100d));
            }

            totalPrice = totalPrice.add(price.multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        return new ResponseEntity<>(totalPrice, HttpStatus.OK);
    }

}
