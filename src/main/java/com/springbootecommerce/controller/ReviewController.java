package com.springbootecommerce.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.springbootecommerce.dto.CreateReviewDto;
import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.ProductRepository;
import com.springbootecommerce.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springbootecommerce.model.Review;
import com.springbootecommerce.repository.ReviewRepository;

@RestController
@RequestMapping("/api/reviews")

public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/all")
    public List<Review> getReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews;
    }

    @GetMapping("{id}")
    public Review getReviewById(@PathVariable long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody CreateReviewDto createReviewDto, Authentication authentication) {
        // Get the username from the authentication object
        String username = authentication.getName();
        // Find the user by username in the database
        User user = userRepository.findByUsername(username);
        if (user == null) {
            // If user not found, return error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        // Find the product by ID in the database
        Optional<Product> product = productRepository.findById(createReviewDto.getProductId());
        if (!product.isPresent()) {
            // If product not found, return error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Product not found");
        }
        // Create a new review object and set its fields
        Review review = new Review();
        review.setUser(user);
        review.setProduct(product.get());
        review.setRating(createReviewDto.getRating());
        review.setComment(createReviewDto.getComment());
        review.setReviewDate(new Date());
        // Save the review to the database
        reviewRepository.save(review);
        // Return the list of all reviews in the database
        List<Review> reviews = reviewRepository.findAll();
        return ResponseEntity.ok().body(reviews);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable long id, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        Optional<Review> reviewOptional = reviewRepository.findById(id);
        if (reviewOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }

        Review review = reviewOptional.get();
        if (!review.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this review");
        }

        try {
            reviewRepository.delete(review);
            return ResponseEntity.ok().body("Review deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the review");
        }
    }



    @PutMapping("/update/{id}")
    public List<Review> updateReview(@PathVariable long id, @RequestBody Review review) {
        if (reviewRepository.existsById(id)) {
            review.setId(id);
            reviewRepository.save(review);
        }

        return reviewRepository.findAll();
    }
}
