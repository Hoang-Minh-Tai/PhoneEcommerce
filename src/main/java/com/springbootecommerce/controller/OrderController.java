package com.springbootecommerce.controller;

import java.util.*;

import com.springbootecommerce.dto.CreateOrderDto;
import com.springbootecommerce.dto.UpdateOrderDto;
import com.springbootecommerce.enums.OrderStatus;
import com.springbootecommerce.model.*;
import com.springbootecommerce.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @Autowired
    private OrderProductRepository orderProductRepository;
    @Autowired
    private VoucherRepository voucherRepository;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/get/{id}")
    public Order getOrderById(@PathVariable long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/add")
    public Order addOrder(Authentication authentication, @RequestBody CreateOrderDto createOrderDto) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        Voucher voucher = voucherRepository.findByCode(createOrderDto.getVoucherCode());

        // Find all shopping cart items in the user's shopping cart
        List<ShoppingCartItem> cartItems = shoppingCartItemRepository.findByUser(user);
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentType(createOrderDto.getPaymentType());
        order.setVoucher(voucher);

        Set<OrderProduct> productList = new HashSet<>();
        double totalPrice = 0;
        for (ShoppingCartItem item : cartItems) {
            Product product = item.getProduct();
            OrderProduct orderProduct = new OrderProduct();
            // Check if there's a discount for this product
            Discount discount = discountRepository.findByProduct(product).orElse(null);

            double price = product.getPrice();
            if (discount != null && (discount.getExpiredAt() == null || discount.getExpiredAt().after(new Date()))) {
                price = price * (1 - discount.getDiscount() / 100d);
            }

            orderProduct.setProduct(product);
            orderProduct.setOrder(order);
            orderProduct.setQuantity(item.getQuantity());
            totalPrice += price * item.getQuantity();
            productList.add(orderProduct);
            orderProductRepository.save(orderProduct);
            shoppingCartItemRepository.delete(item);
        }
        if (voucher != null) totalPrice = totalPrice * (100 - voucher.getDiscount()) / 100;
        order.setProducts(productList);
        order.setTotalPrice(totalPrice);
        orderRepository.save(order);
        return order;
    }

    @DeleteMapping("/delete/{id}")
    public List<Order> deleteOrder(@PathVariable long id) {
        orderRepository.deleteById(id);
        return orderRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update/{id}")
    public Order updateOrder(@PathVariable long id, @RequestBody UpdateOrderDto updateOrderDto) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(updateOrderDto.getOrderStatus());
        orderRepository.save(order);
        return order;
    }
}
