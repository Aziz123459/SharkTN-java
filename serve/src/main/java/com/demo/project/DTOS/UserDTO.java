package com.demo.project.DTOS;

import java.util.Date;

import com.demo.project.models.Role;

import lombok.Data;

@Data
public class UserDTO {
	private Long id;
	private String fullname;
    private String email;
	private String password;
	private String confirm;
	private Date birth;
	private int phone;
	private String profile;
	private Role role;
}
