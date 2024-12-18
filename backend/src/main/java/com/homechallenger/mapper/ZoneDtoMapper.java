package com.homechallenger.mapper;

import com.homechallenger.domain.entity.Zone;
import com.homechallenger.dto.request.ZoneRequestDto;
import com.homechallenger.dto.response.ZoneResponseDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ZoneDtoMapper {
    private final ModelMapper modelMapper;

    public ZoneDtoMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ZoneResponseDto mapToZoneResponseDto(Zone zone) {
        return modelMapper.map(zone, ZoneResponseDto.class);
    }
    public Zone mapToZone(ZoneRequestDto zoneRequestDto) {
        return modelMapper.map(zoneRequestDto, Zone.class);
    }
}
