package com.apollo.dealers.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.apollo.dealers.dto.ChangePasswordRequest;
import com.apollo.dealers.dto.LoginRequest;
import com.apollo.dealers.dto.LoginResponse;
import com.apollo.dealers.entity.User;
import com.apollo.dealers.repository.UserRepository;
import com.apollo.dealers.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByVendorCode(request.getVendorCode())
                .orElseThrow(() -> new RuntimeException("Invalid Vendor Code"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(
                user.getVendorCode());

        return new LoginResponse(
                "Login Successful",
                user.getRole().name(),
                user.getFirstLogin(),
                token);
    }

    public String changePassword(ChangePasswordRequest request) {

        User user = userRepository
                .findByVendorCode(request.getVendorCode())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {

            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        user.setFirstLogin(false);

        userRepository.save(user);

        return "Password changed successfully";
    }
}