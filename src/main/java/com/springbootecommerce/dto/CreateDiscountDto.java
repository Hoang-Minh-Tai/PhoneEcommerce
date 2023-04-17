package com.springbootecommerce.dto;

import java.util.Date;

public class CreateDiscountDto {
    private long productId;
    private double discount;
    private Date expiredAt;

    public long getProductId() {
        return productId;
    }

    public double getDiscount() {
        return discount;
    }

    public Date getExpiredAt() {
        return expiredAt;
    }
}
