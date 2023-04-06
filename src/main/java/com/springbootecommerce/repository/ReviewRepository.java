package com.springbootecommerce.repository;

import com.springbootecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The Interface ReviewRepository.
 *
 * @author devrobot
 * @version 1.0
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
