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

import com.springbootecommerce.model.Category;
import com.springbootecommerce.repository.CategoryRepository;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryResource {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/test/hello")
    public String test() {
        return "Hello";
    }

    @GetMapping("/get")
    public Category getCategoryById(@RequestParam("id") long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @PostMapping("/add")
    public List<Category> addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public List<Category> deleteCategory(@PathVariable long id) {
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public List<Category> updateCategory(@PathVariable long id, @RequestBody Category category) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            categoryRepository.save(category);
        }

        return categoryRepository.findAll();
    }
}
