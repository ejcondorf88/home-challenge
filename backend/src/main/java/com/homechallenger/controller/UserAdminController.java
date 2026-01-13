package com.homechallenger.controller;

import com.homechallenger.dto.request.SignUpRequestDto;
import com.homechallenger.dto.response.UserResponseDto;
import com.homechallenger.dto.request.UserRequestDto;
import com.homechallenger.service.UserInterface;
import com.homechallenger.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class UserAdminController {

    @Autowired
    private UserInterface userService;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody SignUpRequestDto userRequestDto) {
        return ResponseEntity.status(201).body(userService.signUp(userRequestDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Integer id, @RequestBody UserRequestDto userRequestDto) {
        return ResponseEntity.ok(userService.updateUser(id, userRequestDto));
    }


}
