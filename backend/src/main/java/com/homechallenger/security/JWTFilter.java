package com.homechallenger.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JWTFilter extends GenericFilterBean {

    private final TokenProvider tokenProvider;

    // Inyección del TokenProvider
    public JWTFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // Convertir el ServletRequest a HttpServletRequest
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;

        // Obtener el token JWT del encabezado Authorization
        String bearerToken = httpServletRequest.getHeader("Authorization");

        // Verificar si el token comienza con "Bearer "
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String jwt = bearerToken.substring(7); // Eliminar "Bearer " para obtener solo el token
            try {
                // Obtener la autenticación a partir del token JWT
                Authentication authentication = tokenProvider.getAuthentication(jwt);

                // Establecer la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // Si ocurre una excepción (por ejemplo, token no válido o expirado), limpiar el contexto
                SecurityContextHolder.clearContext();
                // Podrías registrar el error si es necesario
            }
        }

        // Continuar con el siguiente filtro en la cadena
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
