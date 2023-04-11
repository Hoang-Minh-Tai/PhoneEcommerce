package com.springbootecommerce.dto;

public class CreateReviewDto {

    private long productId;

    public Long getProductId() {
        return productId;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    private int rating;
    private String comment;
}
