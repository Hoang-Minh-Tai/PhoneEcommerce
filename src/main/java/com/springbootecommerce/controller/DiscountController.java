package com.springbootecommerce.controller;

import com.springbootecommerce.dto.CreateDiscountDto;
import com.springbootecommerce.dto.UpdateDiscountDto;
import com.springbootecommerce.model.Discount;
import com.springbootecommerce.model.Product;
import com.springbootecommerce.repository.DiscountRepository;
import com.springbootecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/discounts")
public class DiscountController {

    @Autowired
    private DiscountRepository discountRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping()
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        List<Discount> discounts = discountRepository.findAll();
        return new ResponseEntity<>(discounts, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Discount> getDiscountById(@PathVariable("id") long id) {
        Discount discount = discountRepository.findById(id).orElse(null);
        if (discount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(discount, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Discount> createDiscount(@RequestBody CreateDiscountDto discountDto) {
        Product product = productRepository.findById(discountDto.getProductId()).orElse(null);
        Discount discount = new Discount();
        discount.setProduct(product);
        discount.setDiscount(discountDto.getDiscount());
        discount.setCreatedAt(new Date());
        discount.setExpiredAt(discountDto.getExpiredAt());
        discountRepository.save(discount);
        return new ResponseEntity<>(discount, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Discount> updateDiscount(@PathVariable("id") long id, @RequestBody UpdateDiscountDto updateDiscountDto) {
        Discount existingDiscount = discountRepository.findById(id).orElse(null);
        if (existingDiscount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingDiscount.setDiscount(updateDiscountDto.getDiscount());
        existingDiscount.setExpiredAt(updateDiscountDto.getExpiredAt());
        Discount updatedDiscount = discountRepository.save(existingDiscount);
        return new ResponseEntity<>(updatedDiscount, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<HttpStatus> deleteDiscount(@PathVariable("id") long id) {
        Discount discount = discountRepository.findById(id).orElse(null);
        if (discount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        discountRepository.delete(discount);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
