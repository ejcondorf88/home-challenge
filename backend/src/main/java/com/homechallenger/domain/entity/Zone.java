package com.homechallenger.domain.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Table(name = "zone")
@Entity
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "opening_time")
    private LocalTime openingTime; // Hora de apertura

    @Column(name = "closing_time")
    private LocalTime closingTime; // Hora de cierre

    @Column(name = "coordinates")
    private String coordinates; // Coordenadas en formato JSON

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;


    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
