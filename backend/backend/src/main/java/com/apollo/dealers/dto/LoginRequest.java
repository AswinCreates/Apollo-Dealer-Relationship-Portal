package com.apollo.dealers.dto;

public class LoginRequest {

    private String vendorCode;
    private String email;
    private String role;
    private String password;

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(
            String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(
            String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password) {
        this.password = password;
    }
}
