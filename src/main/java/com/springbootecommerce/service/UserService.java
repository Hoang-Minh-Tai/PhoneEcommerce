package com.springbootecommerce.service;

import com.springbootecommerce.dto.RegisterUserDto;
import com.springbootecommerce.enums.Role;
import com.springbootecommerce.enums.UserStatus;
import com.springbootecommerce.model.User;
import com.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
    public User save(RegisterUserDto registerUserDto) {
        User user = new User(registerUserDto.getUsername(), passwordEncoder.encode(registerUserDto.getPassword()), registerUserDto.getPhoneNumber(), registerUserDto.getEmail(), registerUserDto.getGender(), registerUserDto.getShippingAddress(), Role.USER, UserStatus.ACTIVE);
        return userRepository.save(user);
    }

    private static Collection<? extends GrantedAuthority> mapRolesToAuthorities(Role userRole) {
        return Arrays.asList(new SimpleGrantedAuthority(userRole.toString()));
    }


}
