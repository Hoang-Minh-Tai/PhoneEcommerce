package com.springbootecommerce.dto;

public class UpdateProductDto {

    private String brand;

    private String model;

    private String description;

    private String imageUrl;

    private double price;

    private String memoryVersion;

    private boolean inStock;

    private Long categoryId;

    public UpdateProductDto() {
        // Default constructor
    }

    public UpdateProductDto(String brand, String model, String description, String imageUrl, double price, String memoryVersion, boolean inStock, Long categoryId) {
        this.brand = brand;
        this.model = model;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.memoryVersion = memoryVersion;
        this.inStock = inStock;
        this.categoryId = categoryId;
    }

    // Getters and setters

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMemoryVersion() {
        return memoryVersion;
    }

    public void setMemoryVersion(String memoryVersion) {
        this.memoryVersion = memoryVersion;
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
