package com.springbootecommerce.dto;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class CreateProductDto {
    @NotBlank(message = "Brand is required")
    @Size(max = 25, message = "Brand cannot be more than 25 characters")
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max = 25, message = "Model cannot be more than 25 characters")
    private String model;

    @NotBlank(message = "Description is required")
    @Size(max = 250, message = "Description cannot be more than 250 characters")
    private String description;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Memory version is required")
    @Size(max = 25, message = "Memory version cannot be more than 25 characters")
    private String memoryVersion;

    @NotNull(message = "Discount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Discount must be greater than 0")
    private BigDecimal discount;

    @NotNull(message = "In stock flag is required")
    private boolean inStock;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    // constructor, getters, and setters

    public CreateProductDto(String brand, String model, String description, String imageUrl, BigDecimal price, String memoryVersion, BigDecimal discount, boolean inStock, Long categoryId) {
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.memoryVersion = memoryVersion;
        this.discount = discount;
        this.inStock = inStock;
        this.categoryId = categoryId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getMemoryVersion() {
        return memoryVersion;
    }

    public void setMemoryVersion(String memoryVersion) {
        this.memoryVersion = memoryVersion;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
