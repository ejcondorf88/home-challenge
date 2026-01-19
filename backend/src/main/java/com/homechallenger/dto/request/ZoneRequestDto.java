package com.homechallenger.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class ZoneRequestDto {

    @NotBlank
    private String name;

    @NotBlank
    private LocalTime openingTime;

    @NotBlank
    private LocalTime closingTime;

    @NotBlank
    private String coordinates;

   
}
