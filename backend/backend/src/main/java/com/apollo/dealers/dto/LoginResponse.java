package com.apollo.dealers.dto;

public class LoginResponse {

    private String message;
    private String role;
    private Boolean firstLogin;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(
            String message,
            String role,
            Boolean firstLogin,
            String token) {

        this.message = message;
        this.role = role;
        this.firstLogin = firstLogin;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }

    public String getToken() {
        return token;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public void setToken(String token) {
        this.token = token;
    }
}