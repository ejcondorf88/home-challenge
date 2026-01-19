package com.homechallenger.security;

import lombok.AllArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
@AllArgsConstructor
public class JwtConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;


  
    @Override
    public void configure(HttpSecurity http) {
        JWTFilter customFilter = new JWTFilter(tokenProvider);
        http.addFilterBefore(customFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
    }
}
