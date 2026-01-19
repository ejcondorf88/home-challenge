package com.homechallenger.service;

import com.homechallenger.domain.entity.User;
import com.homechallenger.domain.enums.Role;
import com.homechallenger.dto.request.ZoneRequestDto;
import com.homechallenger.dto.response.ZoneResponseDto;
import com.homechallenger.repository.UserRepository;
import com.homechallenger.service.impl.ZoneService;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@SpringBootTest
@Transactional
public class ZoneServiceIntegrationTest {
    @Autowired
    private ZoneService zoneService;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void createZone_HappyPath() {
        User user = new User();
        user.setName("Test");
        user.setLastName("User");
        user.setEmail("test" + RandomStringUtils.randomAlphanumeric(5) + "@example.com");
        user.setUsername("testuser" + RandomStringUtils.randomAlphanumeric(5));
        user.setPassword(passwordEncoder.encode("password"));
        user.setIdentification("099" + RandomStringUtils.randomNumeric(7));
        user.setCoordenadasDomicilio("0,0");
        user.setRole(Role.USER);
        
        user = userRepository.save(user);

        ZoneRequestDto requestDto = new ZoneRequestDto();
        requestDto.setName("Test Zone");
        requestDto.setOpeningTime(LocalTime.of(8, 0));
        requestDto.setClosingTime(LocalTime.of(18, 0));
        requestDto.setCoordinates("-0.18, -78.46");

        ZoneResponseDto responseDto = zoneService.createZone(requestDto);

        Assertions.assertNotNull(responseDto);
        Assertions.assertNotNull(responseDto.getId());
        Assertions.assertEquals("Test Zone", responseDto.getName());
    }
}
