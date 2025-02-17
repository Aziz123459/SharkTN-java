package com.demo.project.DTOS;

import lombok.Data;

@Data
public class PreSeedDTO {
	private Long id; // ID of the PreSeed
    private String email; // Investor's email
  
    private String projectName; // Name of the project
   
    private String discription; // Description of the project
   
    private String problemSolve; // Problem being solved

    private Long userId; // ID of the associated user
}
