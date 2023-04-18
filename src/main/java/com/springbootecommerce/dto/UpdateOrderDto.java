package com.springbootecommerce.dto;

import com.springbootecommerce.enums.OrderStatus;

public class UpdateOrderDto {
    private String status;


    public UpdateOrderDto() {
    }

    public UpdateOrderDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OrderStatus getOrderStatus() {
        if (status.equals("ACCEPTED")) return OrderStatus.ACCEPTED;
        else if (status.equals("PENDING")) return OrderStatus.PENDING;
        else if (status.equals("REJECTED")) return OrderStatus.REJECTED;
        return OrderStatus.PENDING;
    }

}
