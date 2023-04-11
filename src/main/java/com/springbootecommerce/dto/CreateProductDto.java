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

    @NotNull(message = "In stock flag is required")
    private boolean inStock;

    @NotNull(message = "Category ID is required")
    private Long categoryId;


    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }


    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public String getMemoryVersion() {
        return memoryVersion;
    }


    public boolean isInStock() {
        return inStock;
    }


    public Long getCategoryId() {
        return categoryId;
    }
}
