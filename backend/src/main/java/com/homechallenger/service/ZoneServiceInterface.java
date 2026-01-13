package com.homechallenger.service;

import com.homechallenger.dto.request.ZoneRequestDto;
import com.homechallenger.dto.response.ZoneResponseDto;

import java.util.List;

public interface ZoneServiceInterface {

    ZoneResponseDto getZoneById(Integer id);

    List<ZoneResponseDto> getAllZones();

    ZoneResponseDto createZone(ZoneRequestDto zoneRequestDto);

    ZoneResponseDto updateZone(Integer id, ZoneRequestDto zoneRequestDto);

    void deleteZone(Integer id);
}
