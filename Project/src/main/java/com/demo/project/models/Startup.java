package com.demo.project.models;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="startup")
public class Startup {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Enumerated(EnumType.STRING)
	private String pendingStage;
	public enum pendingStage {
	pending, accepted, denied
	}
	
//	@Enumerated(EnumType.STRING)
//	private String Pipeline;
//	public enum Pipeline {
//	pending, negotiation, deal
//	}
	
	@NotEmpty(message="Startup name is required")
	@Size(min=3,message="Startup name must be at least 3 characters")
	private String startupName;
	
	@NotEmpty(message="Startup logo is required")
	private String StartupLogo;
	
	@NotEmpty(message = "Business Registration Number is required.")
    @Pattern(
        regexp = "^[0-9]{7}[A-Za-z]$",
        message = "Business Registration Number must be 7 digits followed by one letter."
    )
    private String BusinessRegistrationNumber;
	
	@NotEmpty(message="Industry is required")
	private String Industry;
	
	
	@NotEmpty(message="Description is required")
	private String BriefDescription;
	
	@NotEmpty(message="Government IssuedID is required")
	private String UploadGovernmentIssuedID;
	
	@NotEmpty(message="Business Registration Certificate is required")
	private String UploadBusinessRegistrationCertificate;
	
	private int teamNumber;
	
	private int userId;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "startup_id", referencedColumnName = "id")
    private User creator;
	
	@NotEmpty(message="Startup email is required")
	private String startupEmail;

	private String pitchVideo;
	
	private String website;

	private String facebook;

	private String instagram;

	private String twitter;

	@Column(updatable = false)
    private Date createdAt;
	
    private Date updatedAt;

   
	@PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPendingStage() {
		return pendingStage;
	}

	public void setPendingStage(String pendingStage) {
		this.pendingStage = pendingStage;
	}

	public String getStartupName() {
		return startupName;
	}

	public void setStartupName(String startupName) {
		this.startupName = startupName;
	}

	public String getStartupLogo() {
		return StartupLogo;
	}

	public void setStartupLogo(String startupLogo) {
		StartupLogo = startupLogo;
	}

	public String getBusinessRegistrationNumber() {
		return BusinessRegistrationNumber;
	}

	public void setBusinessRegistrationNumber(String businessRegistrationNumber) {
		BusinessRegistrationNumber = businessRegistrationNumber;
	}

	public String getIndustry() {
		return Industry;
	}

	public void setIndustry(String industry) {
		Industry = industry;
	}

	public String getBriefDescription() {
		return BriefDescription;
	}

	public void setBriefDescription(String briefDescription) {
		BriefDescription = briefDescription;
	}

	public String getUploadGovernmentIssuedID() {
		return UploadGovernmentIssuedID;
	}

	public void setUploadGovernmentIssuedID(String uploadGovernmentIssuedID) {
		UploadGovernmentIssuedID = uploadGovernmentIssuedID;
	}

	public String getUploadBusinessRegistrationCertificate() {
		return UploadBusinessRegistrationCertificate;
	}

	public void setUploadBusinessRegistrationCertificate(String uploadBusinessRegistrationCertificate) {
		UploadBusinessRegistrationCertificate = uploadBusinessRegistrationCertificate;
	}

	public int getTeamNumber() {
		return teamNumber;
	}

	public void setTeamNumber(int teamNumber) {
		this.teamNumber = teamNumber;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getStartupEmail() {
		return startupEmail;
	}

	public void setStartupEmail(String startupEmail) {
		this.startupEmail = startupEmail;
	}

	public String getPitchVideo() {
		return pitchVideo;
	}

	public void setPitchVideo(String pitchVideo) {
		this.pitchVideo = pitchVideo;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public String getInstagram() {
		return instagram;
	}

	public void setInstagram(String instagram) {
		this.instagram = instagram;
	}

	public String getTwitter() {
		return twitter;
	}

	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

    
    
    
    
    
}
