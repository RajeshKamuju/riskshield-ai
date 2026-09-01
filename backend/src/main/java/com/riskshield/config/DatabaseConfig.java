package com.riskshield.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.riskshield.repository")
@EnableTransactionManagement
public class DatabaseConfig {
    // High-performance transaction management and repository scanning
}
