package com.demo.project.DTOS;

import lombok.Data;

@Data
public class InvestorWithUserDTO {
    private Long id;
    private String businessRegistrationNumber;
    private int investmentAmount;
    private String message;
    private UserDTO user;
    private String investorEmail;
}
