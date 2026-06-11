package com.apollo.dealers.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.apollo.dealers.entity.User;
import com.apollo.dealers.repository.UserRepository;

@Service
public class CustomUserDetailsService
                implements UserDetailsService {

        private final UserRepository userRepository;

        public CustomUserDetailsService(
                        UserRepository userRepository) {

                this.userRepository = userRepository;
        }

@Override
public UserDetails loadUserByUsername(
        String vendorCode)
        throws UsernameNotFoundException {

    User user = userRepository
            .findByVendorCode(vendorCode)
            .orElseThrow(() ->
                    new UsernameNotFoundException(
                            "User not found"));

    return org.springframework.security.core.userdetails.User
            .withUsername(user.getVendorCode())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .build();
}

}
