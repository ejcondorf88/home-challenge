package com.homechallenger.mapper;

import com.homechallenger.domain.entity.User;
import com.homechallenger.dto.request.SignUpRequestDto;
import com.homechallenger.dto.response.AuthResponseDto;
import com.homechallenger.dto.response.UserResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class UserDtoMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public UserDtoMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public UserResponseDto mapToUserResponseDto(User user) {
        return modelMapper.map(user, UserResponseDto.class);
    }
    public List<UserResponseDto> mapToUserResponseDtoList(List<User> users) {
        return users.stream()
                .map(this::mapToUserResponseDto)
                .toList();
    }
    public User toUser(SignUpRequestDto singUpDto) {
        return modelMapper.map(singUpDto, User.class);
    }
    public UserResponseDto toUserResponseDto(User user) {
        return modelMapper.map(user, UserResponseDto.class);
    }

    public AuthResponseDto toAuthResponseDto(String token, UserResponseDto user) {
        AuthResponseDto authResponseDto = new AuthResponseDto();
        authResponseDto.setToken(token);
        authResponseDto.setUser(user);
        return authResponseDto;
    }
}
