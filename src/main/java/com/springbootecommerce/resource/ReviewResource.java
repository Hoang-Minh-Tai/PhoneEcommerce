package com.springbootecommerce.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
@CrossOrigin("*")
public class ReviewResource {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @GetMapping("/get")
    public Review getReviewById(@RequestParam("id") long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public List<Review> addReview(@RequestBody Review review) {
        reviewRepository.save(review);
        return reviewRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public List<Review> deleteReview(@PathVariable long id) {
        reviewRepository.deleteById(id);
        return reviewRepository.findAll();
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
