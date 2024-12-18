package com.homechallenger.dto.response;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String token;
    private UserResponseDto user;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }
}
