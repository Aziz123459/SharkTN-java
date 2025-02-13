package com.demo.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	private  final Jwt jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http
				.csrf()
				.disable()
				.authorizeHttpRequests()
				.requestMatchers("/api/v1/auth/**")
				.permitAll()
				.requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
				.requestMatchers("/api/v1/startup/**").hasAnyRole("INVESTOR","STARTUP_FOUNDER", "ADMIN")
				.requestMatchers("/api/v1/startups/**").hasAnyRole("ADMIN")
				.requestMatchers("/api/v1/investors/**").hasAnyRole("ADMIN")
				.requestMatchers("/api/v1/investor/**").hasAnyRole("STARTUP_FOUNDER", "INVESTOR", "ADMIN")
				.requestMatchers("/api/v1/startupProfile/**").hasAnyRole( "STARTUP_FOUNDER")
				.requestMatchers("/api/v1/investorProfile/**").hasAnyRole( "INVESTOR")
				.requestMatchers(HttpMethod.GET ,"/api/v1/profile/**").permitAll()
				.requestMatchers("/api/v1/logout/**").hasAnyRole("INVESTOR", "STARTUP_FOUNDER", "ADMIN")
				.requestMatchers(HttpMethod.GET, "/api/v1/incubator/**").permitAll() // Allow GET request
				.requestMatchers(HttpMethod.GET, "/api/v1/preseed/**").permitAll() // Allow GET request
				.requestMatchers(HttpMethod.GET, "/api/v1/all/**").permitAll() // Allow GET request
				.anyRequest()
				.authenticated()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}


