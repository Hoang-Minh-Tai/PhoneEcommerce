package com.springbootecommerce.controller;

import com.springbootecommerce.dto.LoginUserDto;
import com.springbootecommerce.dto.RegisterUserDto;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.UserRepository;
import com.springbootecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Base64;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto) {

        if (userRepository.findByUsername(registerUserDto.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already in use");
        }

        if (userRepository.findByEmail(registerUserDto.getEmail()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already in use");
        }

        User savedUser = userService.save(registerUserDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDto userCredentials) {
        String username = userCredentials.getUsername();
        String password = userCredentials.getPassword();
        User user = userRepository.findByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }

        String authHeader = "Basic " + Base64.getEncoder().encodeToString((username + ":" + password).getBytes());
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .body(user);
    }

    @GetMapping("/test")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String test(Authentication authentication) {
        System.out.println(authentication);
        if (authentication != null && authentication.isAuthenticated()) {
            return "Hello, " + authentication.getName() + "!";
        } else {
            return "Hello, anonymous!";
        }
    }
}
