package com.homechallenger.service.impl;
import com.homechallenger.dto.request.UserRequestDto;
import com.homechallenger.service.UserInterface;

import lombok.AllArgsConstructor;

import org.apache.commons.lang3.RandomStringUtils;
import com.homechallenger.domain.entity.User;
import com.homechallenger.dto.request.AuthRequestDto;
import com.homechallenger.dto.request.SignUpRequestDto;
import com.homechallenger.dto.response.AuthResponseDto;
import com.homechallenger.dto.response.UserResponseDto;
import com.homechallenger.exception.BadRequestException;
import com.homechallenger.mapper.UserDtoMapper;
import com.homechallenger.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.homechallenger.security.TokenProvider;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
    @Transactional

public class UserService  implements UserInterface {
    private  final  UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDtoMapper userDtoMapper;

    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

public AuthResponseDto login(AuthRequestDto singUpDto) {
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    singUpDto.getUsername().trim(),
                    singUpDto.getPassword().trim()
            )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String accessToken = tokenProvider.createToken(authentication);
        UserResponseDto userResponseDto = userDtoMapper.toUserResponseDto(userRepository.findByUsername(singUpDto.getUsername()).orElseThrow());
        ;
        userResponseDto.setRol(userRepository.findByUsername(singUpDto.getUsername()).orElseThrow().getRole());


    return userDtoMapper.toAuthResponseDto(accessToken, userResponseDto);
}


    public UserResponseDto signUp(SignUpRequestDto singUpDto) {

        if (userRepository.existsByUsername(singUpDto.getEmail())) {
            throw new BadRequestException("User already exists");
        }

        // Generar username
        String username = generateUsername(singUpDto.getName(), singUpDto.getLastName());
        System.out.println("🆔 Username generado: " + username);

        // Generar contraseña
        String password = RandomStringUtils.randomAlphanumeric(8);

        // Crear usuario
        User user = userDtoMapper.toUser(singUpDto);
        user.setRole(singUpDto.getRol());
        user.setUsername(username);

        // Encriptar password
        String encodedPassword = passwordEncoder.encode(password);

        user.setPassword(encodedPassword);

        User savedUser = userRepository.save(user);

        // Respuesta
        UserResponseDto responseDto = userDtoMapper.toUserResponseDto(savedUser);
        responseDto.setUsername(username);
        responseDto.setPassword(password); // solo para mostrar/enviar
        responseDto.setRol(savedUser.getRole());


        return responseDto;
    }


    /**
     * Genera un username único basado en los nombres y apellidos.
     * Si ya existe en la base de datos, añade un número aleatorio para hacerlo único.
     */
    private String generateUsername(String nombres, String apellidos) {
        String baseUsername = (nombres.substring(0, 1) + apellidos).toLowerCase().replaceAll("\\s+", "");
        String username = baseUsername;

        int counter = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }
        return username;
    }

    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userDtoMapper::toUserResponseDto)
                .collect(Collectors.toList());
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public UserResponseDto getUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow();
        return userDtoMapper.toUserResponseDto(user);
    }

    public UserResponseDto updateUser(Integer id, UserRequestDto userRequestDto) {
        User user = userRepository.findById(id).orElseThrow();
        user.setName(userRequestDto.getName());
        user.setLastName(userRequestDto.getLastName());
        user.setEmail(userRequestDto.getEmail());
        User updatedUser = userRepository.save(user);
        return userDtoMapper.toUserResponseDto(updatedUser);
    }





}
