package com.springbootecommerce.dto;

import java.math.BigDecimal;
import java.util.Date;

public class CreateDiscountDto {
    private long productId;
    private BigDecimal discount;
    private Date expiredAt;

    public long getProductId() {
        return productId;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public Date getExpiredAt() {
        return expiredAt;
    }
}
