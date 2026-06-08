package com.apollo.dealers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String vendorCode;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "first_login")
    private Boolean firstLogin = true;

    private Boolean active = true;

    public User() {
    }

    // ==========================
    // Getters
    // ==========================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public String getPassword() {
        return password;
    }

    public UserRole getRole() {
        return role;
    }

    public Boolean getFirstLogin() {
        return firstLogin;
    }

    public Boolean getActive() {
        return active;
    }

    // ==========================
    // Setters
    // ==========================

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}