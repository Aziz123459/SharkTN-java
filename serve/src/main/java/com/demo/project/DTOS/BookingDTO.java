package com.demo.project.DTOS;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BookingDTO {
    private Long id;
    private Date bookingDate;
    private InvestorDTO investorDTO;
    private StartupDTO startupDTO;

}
