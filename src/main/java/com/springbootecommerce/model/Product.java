package com.springbootecommerce.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "brand")
	private String brand;

	@Column(name = "model")
	private String model;

	@Column(name = "description")
	private String description;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "price", nullable = false)
	private double price;

	@Column(name = "memory_version")
	private String memoryVersion;

	@Column(name = "in_stock")
	private boolean inStock;

	@ManyToOne()
	@JoinColumn(name = "category_id")
	private Category category;

	public Product() {
		// Default constructor for JPA
	}

	public Product(String brand, String model, String description, String imageUrl, double price, String memoryVersion, boolean inStock, Category category) {
		this.brand = brand;
		this.model = model;
		this.description = description;
		this.imageUrl = imageUrl;
		this.price = price;
		this.memoryVersion = memoryVersion;
		this.inStock = inStock;
		this.category = category;
	}

	// Getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getMemoryVersion() {
		return memoryVersion;
	}

	public void setMemoryVersion(String memoryVersion) {
		this.memoryVersion = memoryVersion;
	}

	public boolean isInStock() {
		return inStock;
	}

	public void setInStock(boolean inStock) {
		this.inStock = inStock;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


}
