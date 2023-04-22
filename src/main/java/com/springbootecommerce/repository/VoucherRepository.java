package com.springbootecommerce.repository;

import com.springbootecommerce.model.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}

