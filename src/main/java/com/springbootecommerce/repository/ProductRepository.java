package com.springbootecommerce.repository;

import com.springbootecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * The Interface ProductRepository.
 *
 * 
 * @version 1.0
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.name = :categoryName")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);

    List<Product> findByModelContaining(String value);

    List<Product> findByCategoryNameAndModelContaining(String categoryName, String value);


}
