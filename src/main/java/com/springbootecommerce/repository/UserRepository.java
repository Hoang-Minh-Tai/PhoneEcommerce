package com.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootecommerce.model.User;

/**
 * The Interface UserRepository.
 *
 * @author devrobot
 * @version 1.0
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);
}
