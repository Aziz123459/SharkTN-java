package com.demo.project.DTOS;

import lombok.Data;

@Data
public class IncubatorDTO {
	private Long id;
	private String email;
	private String message;
	private int userId;
}
