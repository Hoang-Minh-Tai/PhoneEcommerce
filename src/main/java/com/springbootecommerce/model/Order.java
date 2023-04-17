package com.springbootecommerce.model;

import com.springbootecommerce.enums.OrderStatus;
import com.springbootecommerce.enums.PaymentType;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

    @ManyToOne()
    private User user;

    @ManyToMany()
    private List<Product> product;

    @Column()
    private OrderStatus status;

    private PaymentType paymentType;

    @CreationTimestamp
    private Date createdAt;

    public Order() {
        // Default constructor for JPA
    }

    public Order(Date orderDate, double totalPrice, User user, List<Product> product, OrderStatus status, PaymentType paymentType) {
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.user = user;
        this.product = product;
        this.status = status;
        this.paymentType = paymentType;
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

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
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
