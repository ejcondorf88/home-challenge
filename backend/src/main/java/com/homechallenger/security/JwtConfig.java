package com.homechallenger.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;

public class JwtConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;


    public JwtConfig(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    @Override
    public void configure(HttpSecurity http) {
        JWTFilter customFilter = new JWTFilter(tokenProvider);
        http.addFilterBefore(customFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
    }
}
