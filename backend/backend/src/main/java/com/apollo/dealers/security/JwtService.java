package com.apollo.dealers.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET_KEY = "ApolloContractorComplianceReviewSystemSecretKey2025";

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String vendorCode) {

        return Jwts.builder()
                .subject(vendorCode)
                .issuedAt(new Date())
                .expiration(new Date(
                        System.currentTimeMillis() + 86400000))
                .signWith(key)
                .compact();
    }
}