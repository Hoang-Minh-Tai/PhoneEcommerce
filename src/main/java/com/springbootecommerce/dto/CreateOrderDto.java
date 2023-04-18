package com.springbootecommerce.dto;

import com.springbootecommerce.enums.PaymentType;

public class CreateOrderDto {
    private String paymentType;

    public PaymentType getPaymentType() {
        return paymentType.equals("BANK") ? PaymentType.BANK : PaymentType.PAYPAL;
    }
}
