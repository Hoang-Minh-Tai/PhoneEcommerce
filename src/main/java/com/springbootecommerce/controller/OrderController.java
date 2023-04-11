package com.springbootecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.springbootecommerce.model.Order;
import com.springbootecommerce.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/get")
    public Order getOrderById(@RequestParam("id") long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public List<Order> addOrder(@RequestBody Order order) {
        orderRepository.save(order);
        return orderRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public List<Order> deleteOrder(@PathVariable long id) {
        orderRepository.deleteById(id);
        return orderRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public List<Order> updateOrder(@PathVariable long id, @RequestBody Order order) {
        if (orderRepository.existsById(id)) {
            order.setId(id);
            orderRepository.save(order);
        }

        return orderRepository.findAll();
    }
}
