package com.springbootecommerce.dto;

public class AddCartItemDto {
    private Integer quantity;
    private long productId;

    public Integer getQuantity() {
        return quantity;
    }

    public long getProductId() {
        return productId;
    }
}
