package com.demo.project.auth;

import java.util.Date;

import com.demo.project.models.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
private String fullname;
private Date birth ;
private String email;
private String password;
private String phone;
private String confirm;
private String adress;
private Role role;

}
