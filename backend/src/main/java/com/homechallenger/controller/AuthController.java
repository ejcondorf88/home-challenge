package com.homechallenger.controller;

import com.homechallenger.dto.request.AuthRequestDto;
import com.homechallenger.dto.request.SignUpRequestDto;
import com.homechallenger.dto.response.AuthResponseDto;
import com.homechallenger.dto.response.UserResponseDto;
import com.homechallenger.service.UserInterface;
import com.homechallenger.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserInterface userService;
    @Autowired
    public AuthController(UserInterface userService) {
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody AuthRequestDto authRequestDto) {
        AuthResponseDto authResponseDto = userService.login(authRequestDto);
        return ResponseEntity.ok(authResponseDto);
    }
    @PostMapping("/signup")
    public ResponseEntity<UserResponseDto> signUp(@RequestBody @Validated SignUpRequestDto authRequestDto) {
        UserResponseDto authResponseDto = userService.signUp(authRequestDto);
        return ResponseEntity.ok(authResponseDto);
    }
}
