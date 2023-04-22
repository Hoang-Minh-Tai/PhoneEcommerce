package com.springbootecommerce.dto;

public class UpdateCategoryDto {
    private String name;
    private String picture;
    private String description;

    public UpdateCategoryDto(String name, String picture, String description) {
        this.name = name;
        this.picture = picture;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
