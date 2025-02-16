package com.homechallenger.service;

import com.homechallenger.domain.entity.Zone;
import com.homechallenger.dto.request.ZoneRequestDto;
import com.homechallenger.dto.response.UserResponseDto;
import com.homechallenger.dto.response.ZoneResponseDto;
import com.homechallenger.exception.ResourceNotFoundException;
import com.homechallenger.mapper.UserDtoMapper;
import com.homechallenger.mapper.ZoneDtoMapper;
import com.homechallenger.repository.ZoneRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ZoneService {
    private final ZoneDtoMapper modelMapper;
    private final UserDtoMapper userDtoMapper;

    private ZoneRepository zoneRepository;

    @Autowired
    public ZoneService(ZoneRepository zoneRepository, ZoneDtoMapper zoneDtoMapper, UserDtoMapper userDtoMapper) {
        this.zoneRepository = zoneRepository;
        this.modelMapper =  zoneDtoMapper;
        this.userDtoMapper = userDtoMapper;
    }

    public ZoneResponseDto getZoneById(Integer id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Zone not found"));
        return modelMapper.mapToZoneResponseDto(zone);
    }

    public List<ZoneResponseDto> getAllZones() {
        return zoneRepository.findAll().stream()
                .map(zone -> {
                    ZoneResponseDto zoneResponseDto = modelMapper.mapToZoneResponseDto(zone);

                    // Verifica si hay un usuario asociado
                    if (zone.getUser() != null) {
                        UserResponseDto userResponseDto = userDtoMapper.mapToUserResponseDto(zone.getUser());
                        zoneResponseDto.setUser(userResponseDto);
                    }

                    return zoneResponseDto;
                })
                .collect(Collectors.toList());

    }
    public ZoneResponseDto createZone(ZoneRequestDto zone) {
        Zone savedZone = zoneRepository.save(modelMapper.mapToZone(zone));
        return modelMapper.mapToZoneResponseDto(savedZone);
    }
    public ZoneResponseDto updateZone(Integer id, ZoneRequestDto zone) {
        Zone existingZone = zoneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Zone not found"));
        existingZone.setName(zone.getName());
        existingZone.setOpeningTime(zone.getOpeningTime());
        existingZone.setClosingTime(zone.getClosingTime());
        existingZone.setCoordinates(zone.getCoordinates());
        Zone updatedZone = zoneRepository.save(existingZone);
        return modelMapper.mapToZoneResponseDto(updatedZone);
    }

    public void deleteZone(Integer id) {
        zoneRepository.deleteById(id);
    }

}

