package com.homechallenger.dto.request;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalTime;

public class ZoneRequestDto {

    @NotBlank
    private String name;

    @NotBlank
    private LocalTime openingTime;

    @NotBlank
    private LocalTime closingTime;

    @NotBlank
    private String coordinates;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }
}
