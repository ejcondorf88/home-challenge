package com.homechallenger.dto.request;

import com.homechallenger.domain.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SignUpRequestDto {
    @NotBlank(message = "La cédula es obligatoria")
    private String identification;

    @NotBlank(message = "Las coordenadas del domicilio son obligatorias")
    private String coordenadasDomicilio;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder los 50 caracteres")
    private String name;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 50, message = "El apellido no puede exceder los 50 caracteres")
    private String lastName;

    @Email(message = "Debe ser un correo electrónico válido")
    @NotBlank(message = "El correo electrónico es obligatorio")
    private String email;

    @NotNull(message = "El rol es obligatorio")
    private Role rol;

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getCoordenadasDomicilio() {
        return coordenadasDomicilio;
    }

    public void setCoordenadasDomicilio(String coordenadasDomicilio) {
        this.coordenadasDomicilio = coordenadasDomicilio;
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

    public Role getRol() {
        return rol;
    }

    public void setRol(Role rol) {
        this.rol = rol;
    }


}
