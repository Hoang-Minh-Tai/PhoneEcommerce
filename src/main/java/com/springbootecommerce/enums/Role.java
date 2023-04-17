package com.springbootecommerce.enums;

public enum Role {
    ADMIN("ADMIN"),
    USER("USER");

    private final String displayValue;

    Role(String displayValue) {
        this.displayValue = displayValue;
    }

    @Override
    public String toString() {
        return displayValue;
    }
}
