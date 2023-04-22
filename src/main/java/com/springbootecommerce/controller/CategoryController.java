package com.springbootecommerce.controller;

import java.util.List;

import com.springbootecommerce.dto.UpdateCategoryDto;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.springbootecommerce.model.Category;
import com.springbootecommerce.repository.CategoryRepository;

@RestController
@RequestMapping("/api/categories")

public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/get")
    public Category getCategoryById(@RequestParam("id") long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Category> addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Category> deleteCategory(@PathVariable long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Category> updateCategory(@PathVariable long id, @RequestBody UpdateCategoryDto updateCategoryDto) {
        Category category = categoryRepository.findById(id).orElseThrow();
        if (updateCategoryDto.getName() != null) category.setName(updateCategoryDto.getName());
        if (updateCategoryDto.getDescription() != null) category.setDescription(updateCategoryDto.getDescription());
        if (updateCategoryDto.getPicture() != null) category.setPicture(updateCategoryDto.getPicture());
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }
}
