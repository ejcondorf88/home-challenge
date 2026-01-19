package com.homechallenger.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDto {
    private String token;
    private UserResponseDto user;

}
