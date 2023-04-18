package com.springbootecommerce.model;

import com.springbootecommerce.enums.OrderStatus;
import com.springbootecommerce.enums.PaymentType;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "total_price")
    private double totalPrice;

    @OneToMany()
    private Set<OrderProduct> products;

    @ManyToOne()
    private User user;

    @Enumerated(EnumType.STRING)
    @Column()
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    @Column()
    private PaymentType paymentType;

    @CreationTimestamp
    private Date createdAt;

    public Order() {
        // Default constructor for JPA
    }

    public Order(Date orderDate, double totalPrice, Set<OrderProduct> products, User user, OrderStatus status, PaymentType paymentType) {
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.products = products;
        this.user = user;
        this.status = status;
        this.paymentType = paymentType;
    }

    public Long getId() {
        return id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<OrderProduct> getProducts() {
        return products;
    }

    public void setProducts(Set<OrderProduct> products) {
        this.products = products;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }
}
