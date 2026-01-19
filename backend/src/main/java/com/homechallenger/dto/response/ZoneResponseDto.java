package com.homechallenger.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ZoneResponseDto {

    private Integer id;
    private String name;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private String coordinates;
    private UserResponseDto user;
}
