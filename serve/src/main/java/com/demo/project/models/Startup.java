package com.demo.project.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Table(name="startup")
public class Startup {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private int status=0;
	
//	@Enumerated(EnumType.STRING)
//	private String Pipeline;
//	public enum Pipeline {
//	pending, negotiation, deal
//	}
	
	@NotEmpty(message="Startup name is required")
	@Size(min=3,message="Startup name must be at least 3 characters")
	private String startupName;
	
	@NotEmpty(message="Startup logo is required")
	private String startupLogo;
	
	@NotEmpty(message = "Business Registration Number is required.")
    @Pattern(
        regexp = "^[0-9]{7}[A-Za-z]$",
        message = "Business Registration Number must be 7 digits followed by one letter."
    )
    private String businessRegistrationNumber;
	
	@NotEmpty(message="Industry is required")
	private String industry;
	
	
	@NotEmpty(message="Description is required")
	@Column(name = "briefDescription", length = 222222222)
	private String briefDescription;
	
	@NotEmpty(message="Government IssuedID is required")
	private String uploadGovernmentIssuedID;
	
	@NotEmpty(message="Business Registration Certificate is required")
	private String uploadBusinessRegistrationCertificate;
	
	private int teamNumber;
	    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

	@OneToMany(mappedBy = "startup", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Booking> bookings;

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

    
    
    
}
