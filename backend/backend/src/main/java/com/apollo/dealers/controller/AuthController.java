package com.apollo.dealers.controller;

import org.springframework.web.bind.annotation.*;

import com.apollo.dealers.dto.ChangePasswordRequest;
import com.apollo.dealers.dto.LoginRequest;
import com.apollo.dealers.dto.LoginResponse;
import com.apollo.dealers.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @PostMapping("/change-password")
    public String changePassword(
            @RequestBody ChangePasswordRequest request) {

        return authService.changePassword(request);
    }
}