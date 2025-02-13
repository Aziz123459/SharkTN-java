package com.demo.project.DTOS;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BookingTwoDTO {
    private Long id;
    private Date booking2Date;
    private IncubatorDTO incubatorDTO;
    private PreSeedDTO preSeedDTO;
}
