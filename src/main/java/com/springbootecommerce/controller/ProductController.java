package com.springbootecommerce.controller;

import java.util.List;
import java.util.Optional;

import com.springbootecommerce.dto.CreateProductDto;
import com.springbootecommerce.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.springbootecommerce.model.Product;
import com.springbootecommerce.model.Category;
import com.springbootecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;
	@GetMapping("/all")
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@GetMapping("/get")
	public Product getProductById(@RequestParam("id") long id) {
		return productRepository.findById(id).orElse(null);
	}

	@PostMapping("/add")
	public ResponseEntity<Object> addProduct(@RequestBody CreateProductDto productRequest) {
		try {
			Category category = categoryRepository.findById(productRequest.getCategoryId())
					.orElseThrow(() -> new RuntimeException("Category not found"));

			// Create the product using all fields
			Product product = new Product(
					productRequest.getBrand(),
					productRequest.getModel(),
					productRequest.getDescription(),
					productRequest.getImageUrl(),
					productRequest.getPrice(),
					productRequest.getMemoryVersion(),
					productRequest.getDiscount(),
					productRequest.isInStock(),
					category
			);

			productRepository.save(product);
			return ResponseEntity.ok(productRepository.findAll());
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}




	@DeleteMapping("/delete/{id}")
	public List<Product> deleteProduct(@PathVariable long id) {
		productRepository.deleteById(id);
		return productRepository.findAll();
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable(value = "id") Long productId,
												 @RequestBody Product productDetails) {

		Optional<Product> product = productRepository.findById(productId);

		if (!product.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		if (productDetails.getBrand() != null) {
			product.get().setBrand(productDetails.getBrand());
		}

		if (productDetails.getModel() != null) {
			product.get().setModel(productDetails.getModel());
		}

		if (productDetails.getDescription() != null) {
			product.get().setDescription(productDetails.getDescription());
		}

		if (productDetails.getImageUrl() != null) {
			product.get().setImageUrl(productDetails.getImageUrl());
		}

		if (productDetails.getPrice() != null) {
			product.get().setPrice(productDetails.getPrice());
		}

		if (productDetails.getMemoryVersion() != null) {
			product.get().setMemoryVersion(productDetails.getMemoryVersion());
		}

		if (productDetails.getDiscount() != null) {
			product.get().setDiscount(productDetails.getDiscount());
		}

		if (productDetails.isInStock() != false) {
			product.get().setInStock(productDetails.isInStock());
		}

		if (productDetails.getCategory() != null) {
			product.get().setCategory(productDetails.getCategory());
		}

		Product updatedProduct = productRepository.save(product.get());
		return ResponseEntity.ok(updatedProduct);
	}
}
