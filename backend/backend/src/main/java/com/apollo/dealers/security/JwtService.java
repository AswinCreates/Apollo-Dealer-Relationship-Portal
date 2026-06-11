package com.apollo.dealers.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "ApolloContractorComplianceReviewSystemSecretKey2025";

    private final Key key = Keys.hmacShaKeyFor(
            SECRET_KEY.getBytes());

    // ==========================
    // Generate Token
    // ==========================

    public String generateToken(
            String vendorCode) {

        return Jwts.builder()
                .subject(vendorCode)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000))
                .signWith(key)
                .compact();
    }

    // ==========================
    // Extract Username
    // ==========================

    public String extractVendorCode(
            String token) {

        return extractClaims(token)
                .getSubject();
    }

    // ==========================
    // Validate Token
    // ==========================

    public boolean isTokenValid(
            String token,
            String vendorCode) {

        String extractedVendorCode = extractVendorCode(token);

        return extractedVendorCode.equals(
                vendorCode)
                &&
                !isTokenExpired(token);
    }

    // ==========================
    // Expiry Check
    // ==========================

    private boolean isTokenExpired(
            String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // ==========================
    // Claims
    // ==========================

    private Claims extractClaims(
            String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}