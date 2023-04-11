package com.springbootecommerce.enums;

public enum Role {
    ADMIN("Admin"),
    USER("User");

    private final String displayValue;

    Role(String displayValue) {
        this.displayValue = displayValue;
    }

    @Override
    public String toString() {
        return displayValue;
    }
}
