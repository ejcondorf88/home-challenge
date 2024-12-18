package com.homechallenger.controller;

import com.homechallenger.dto.request.ZoneRequestDto;
import com.homechallenger.dto.response.ZoneResponseDto;
import com.homechallenger.service.ZoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/zones")
public class ZoneAdminController {
    private final ZoneService zoneService;

    public ZoneAdminController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }
    @GetMapping
    public ResponseEntity<List<ZoneResponseDto>> getAllZones() {
        return ResponseEntity.ok(zoneService.getAllZones());
    }
    @PostMapping
    public ResponseEntity<ZoneResponseDto> createZone( @RequestBody ZoneRequestDto zoneRequestDto) {
        zoneService.createZone(zoneRequestDto);
        return ResponseEntity.ok(zoneService.createZone(zoneRequestDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteZone( @PathVariable Integer id) {
        zoneService.deleteZone(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<ZoneResponseDto> updateZone(@PathVariable Integer id, @RequestBody ZoneRequestDto zoneRequestDto) {
        return ResponseEntity.ok(zoneService.updateZone(id, zoneRequestDto));
    }


}
