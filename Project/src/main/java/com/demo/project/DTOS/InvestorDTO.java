package com.demo.project.DTOS;

import lombok.Data;

@Data

public class InvestorDTO {
    private Long id;
    private String businessRegistrationNumber;
	private int investmentAmount;
	private String message;
	private int userId;
	private String investorEmail;
	
}