package com.apollo.dealers.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.apollo.dealers.entity.User;
import com.apollo.dealers.entity.UserRole;
import com.apollo.dealers.repository.UserRepository;

@Configuration
public class DataLoader {

    private final PasswordEncoder passwordEncoder;

    public DataLoader(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {

            if (userRepository.findByEmail("admin@apollo.com").isEmpty()) {

                User admin = new User();

                admin.setName("Apollo Admin");
                admin.setEmail("admin@apollo.com");

                // Login Credentials
                admin.setVendorCode("ADM001");
                admin.setPassword(passwordEncoder.encode("admin123"));

                // Role
                admin.setRole(UserRole.ADMIN);

                // Account Status
                admin.setFirstLogin(false);
                admin.setActive(true);

                userRepository.save(admin);

                System.out.println("==================================");
                System.out.println(" Default Admin Created!");
                System.out.println(" Email       : admin@apollo.com");
                System.out.println(" Vendor Code : ADM001");
                System.out.println(" Password    : admin123");
                System.out.println("==================================");
            }

            if (userRepository.findByEmail("aswinrout94281@gmail.com").isEmpty()) {

                User admin2 = new User();

                admin2.setName("Aswin Admin");
                admin2.setEmail("aswinrout94281@gmail.com");

                // Login Credentials
                admin2.setVendorCode("ADM002");
                admin2.setPassword(passwordEncoder.encode("aswin@8511"));

                // Role
                admin2.setRole(UserRole.ADMIN);

                // Account Status
                admin2.setFirstLogin(false);
                admin2.setActive(true);

                userRepository.save(admin2);

                System.out.println("==================================");
                System.out.println(" Aswin Admin Created!");
                System.out.println(" Email       : aswinrout94281@gmail.com");
                System.out.println(" Password    : aswin@8511");
                System.out.println("==================================");
            }
        };
    }
}