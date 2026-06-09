package com.apollo.dealers.dto;

public class LoginRequest {

    private String vendorCode;
    private String password;

    public LoginRequest() {
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}