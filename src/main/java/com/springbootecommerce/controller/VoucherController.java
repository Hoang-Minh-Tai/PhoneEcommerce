package com.springbootecommerce.controller;

import com.springbootecommerce.model.Voucher;
import com.springbootecommerce.repository.VoucherRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {

    @Autowired
    private VoucherRepository voucherRepository;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Voucher> getAllVouchers() {
        return voucherRepository.findAll();
    }

    @GetMapping("/get/{code}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Voucher> getVoucherByCode(@PathVariable(value = "code") String voucherCode) throws NotFoundException {
        Voucher voucher = voucherRepository.findByCode(voucherCode)
                ;
        return ResponseEntity.ok(voucher);
    }


    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Voucher> createVoucher(@RequestBody Voucher voucher) {
        voucherRepository.save(voucher);
        return voucherRepository.findAll();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Voucher> updateVoucher(@PathVariable(value = "id") Long voucherId,
                                                 @RequestBody Voucher voucherDetails) throws NotFoundException {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new NotFoundException("Voucher not found with id: " + voucherId));

        voucher.setCode(voucherDetails.getCode());
        voucher.setDiscount(voucherDetails.getDiscount());
        voucher.setExpirationDate(voucherDetails.getExpirationDate());

        final Voucher updatedVoucher = voucherRepository.save(voucher);
        return ResponseEntity.ok(updatedVoucher);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Voucher> deleteVoucher(@PathVariable(value = "id") Long voucherId) throws NotFoundException {
        Voucher voucher = voucherRepository.findById(voucherId)
                .orElseThrow(() -> new NotFoundException("Voucher not found with id: " + voucherId));

        voucherRepository.delete(voucher);
        return voucherRepository.findAll();
    }
}
