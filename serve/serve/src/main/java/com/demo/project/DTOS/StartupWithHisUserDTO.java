package com.demo.project.DTOS;

import lombok.Data;

@Data
public class StartupWithHisUserDTO {
    private Long id;
    private String pendingStage;
    private String startupName;
    private String StartupLogo;
    private int status;
    private String BusinessRegistrationNumber;
    private String Industry;
    private String BriefDescription;
    private String UploadGovernmentIssuedID;
    private String UploadBusinessRegistrationCertificate;
    private int teamNumber;
    private UserDTO user;
    private String startupEmail;
    private String pitchVideo;
    private String website;
    private String facebook;
    private String instagram;
    private String twitter;
}
