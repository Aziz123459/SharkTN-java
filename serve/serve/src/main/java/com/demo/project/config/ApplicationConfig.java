package com.demo.project.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.demo.project.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    /**
     * Configuration class for setting up security-related beans in the application.
     * Provides beans for user details service, authentication provider, authentication manager,
     * and password encoder. It configures how user details are retrieved, how authentication is
     * handled, and how passwords are encoded.
     */

    private  final UserRepository userRepository;

    /**
     * Provides a UserDetailsService bean that retrieves user details by email.
     *
     * @return UserDetailsService implementation that throws UsernameNotFoundException if the user is not found
     */
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> userRepository.findByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }

    /**
     * Provides an AuthenticationProvider bean configured with UserDetailsService and PasswordEncoder.
     *
     * @return DaoAuthenticationProvider configured with user details service and password encoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Provides an AuthenticationManager bean for managing authentication.
     *
     * @param config AuthenticationConfiguration used to obtain the AuthenticationManager
     * @return AuthenticationManager instance
     * @throws Exception if there is an error obtaining the AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Provides a PasswordEncoder bean that uses BCrypt for password hashing.
     *
     * @return PasswordEncoder instance using BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}