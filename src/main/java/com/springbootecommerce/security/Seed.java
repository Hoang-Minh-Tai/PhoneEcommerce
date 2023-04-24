package com.springbootecommerce.security;

import com.springbootecommerce.enums.Role;
import com.springbootecommerce.enums.UserStatus;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
public class Seed {
    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository,
                                             BCryptPasswordEncoder passwordEncoder) {
        return args -> {
            User adminUser = userRepository.findByUsername("admin");
            if (adminUser == null) {
                User user = new User();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("password"));
                user.setRole(Role.ADMIN);
                user.setEmail("example@gmail.com");
                user.setStatus(UserStatus.ACTIVE);
                userRepository.save(user);
            }
        };
    }

}
