package com.homechallenger.service;

import com.homechallenger.dto.request.AuthRequestDto;
import com.homechallenger.dto.request.SignUpRequestDto;
import com.homechallenger.dto.request.UserRequestDto;
import com.homechallenger.dto.response.AuthResponseDto;
import com.homechallenger.dto.response.UserResponseDto;

import java.util.List;

public interface UserInterface {

    AuthResponseDto login(AuthRequestDto authRequestDto);

    UserResponseDto signUp(SignUpRequestDto signUpRequestDto);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(Integer id);

    UserResponseDto updateUser(Integer id, UserRequestDto userRequestDto);

    void deleteUser(Integer id);
}
