package com.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootecommerce.model.Category;

/**
 * The Interface CategoryRepository.
 *
 * 
 * @version 1.0
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
