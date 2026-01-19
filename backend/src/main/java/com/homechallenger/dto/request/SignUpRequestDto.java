package com.homechallenger.dto.request;

import com.homechallenger.domain.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
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

   

}
