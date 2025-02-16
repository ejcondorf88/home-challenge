package com.homechallenger.domain.entity;

import com.homechallenger.domain.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")

public class User {

    public User() {}

    public User(String subject, String s, List<SimpleGrantedAuthority> authorities) {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }





    public String getCoordenadasDomicilio() {
        return coordenadasDomicilio;
    }

    public void setCoordenadasDomicilio(String coordenadasDomicilio) {
        this.coordenadasDomicilio = coordenadasDomicilio;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", unique = true, nullable = false)

    private String username;

    @Column(name = "password", nullable = false)

    private String password;

    @Column(name = "name", nullable = false)

    private String name;

    @Column(name = "last_name", nullable = false)

    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "identification", unique = true, nullable = false)
    private String identification;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "coordenadas_domicilio", nullable = false)
    private String coordenadasDomicilio;



    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Zone zone;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
