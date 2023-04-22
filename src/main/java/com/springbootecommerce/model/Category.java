package com.springbootecommerce.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * The Class Category.
 * 
 * 
 * @version 1.0
 */
@Entity
public class Category {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	/** The name. */
	@Column(name = "name", unique = true, nullable = false)
	private String name;

	/** The description. */
	@Column(name = "description", length = 10000)
	private String description;

	@Column(name = "picture")
	private String picture;

	/** The products. */
	@OneToMany(mappedBy = "category")
	private List<Product> products;

	/**
	 * Empty Constructor. Instantiates a new category.
	 */
	public Category() {
	}

	public Category(String name, String description, String picture) {
		this.name = name;
		this.description = description;
		this.picture = picture;
	}

	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description the new description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
}
