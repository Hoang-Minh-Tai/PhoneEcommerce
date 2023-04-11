package com.springbootecommerce.controller;

import com.springbootecommerce.dto.RegisterUserDto;
import com.springbootecommerce.model.User;
import com.springbootecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        User savedUser = userService.save(registerUserDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/test")
    public String test(Authentication authentication) {
        System.out.println(authentication);
        if (authentication != null && authentication.isAuthenticated()) {
            return "Hello, " + authentication.getName() + "!";
        } else {
            return "Hello, anonymous!";
        }
    }
}
