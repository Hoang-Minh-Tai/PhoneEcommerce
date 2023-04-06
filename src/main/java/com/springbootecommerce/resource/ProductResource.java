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

import com.springbootecommerce.model.Product;
import com.springbootecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductResource {

	@Autowired
	private ProductRepository productRepository;

	@GetMapping("/all")
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@GetMapping("/get")
	public Product getProductById(@RequestParam("id") long id) {
		return productRepository.findById(id).orElse(null);
	}

	@PostMapping("/add")
	public List<Product> addProduct(@RequestBody Product product) {
		productRepository.save(product);
		return productRepository.findAll();
	}

	@DeleteMapping("/delete/{id}")
	public List<Product> deleteProduct(@PathVariable long id) {
		productRepository.deleteById(id);
		return productRepository.findAll();
	}

	@PutMapping("/update/{id}")
	public List<Product> updateProduct(@PathVariable long id, @RequestBody Product product) {
		if (productRepository.existsById(id)) {
			product.setId(id);
			productRepository.save(product);
		}

		return productRepository.findAll();
	}

	@GetMapping("/test/hello")
	public String test() {
		return "Hello";
	}
}
