package com.demo.project.models;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
@Data
@Entity
@Table(name="investor")
public class Investor {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotEmpty(message = "Business Registration Number is required.")
    @Pattern(
        regexp = "^[0-9]{7}[A-Za-z]$",
        message = "Business Registration Number must be 7 digits followed by one letter."
    )
    private String businessRegistrationNumber;
	
	@NotNull(message="Investment Amount is required")
	private int investmentAmount;
	
	@NotEmpty(message="Investment Amount is required")
	@Column(name = "message", length = 222222222)
	private String message;
	
	@Email
	@NotEmpty(message="Investor email is required")
	private String investorEmail;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "investor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;


    @Column(updatable = false)
    private Date createdAt;
    private Date updatedAt;

    private int status=0;
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