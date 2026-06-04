package com.apollo.dealers.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.apollo.dealers.entity.User;
import com.apollo.dealers.entity.UserRole;
import com.apollo.dealers.repository.UserRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {

            if (userRepository.findByEmail("admin@apollo.com").isEmpty()) {

                User admin = new User();

                admin.setName("Apollo Admin");
                admin.setEmail("admin@apollo.com");
                admin.setPassword("admin123");
                admin.setRole(UserRole.ADMIN);

                userRepository.save(admin);

                System.out.println("Default Admin Created!");
            }

        };
    }
}