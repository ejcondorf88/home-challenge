package com.homechallenger.dto.request;


import com.homechallenger.domain.enums.Role;

public class UserRequestDto {


    private String name;
    private String lastName;
    private String email;

    public UserRequestDto(String username, String password, String name, String lastName, String email, Role role) {

        this.name = name;
        this.lastName = lastName;
        this.email = email;
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
}
