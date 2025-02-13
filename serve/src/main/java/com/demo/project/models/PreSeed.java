package com.demo.project.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="pre seed")
public class PreSeed {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@NotEmpty
	@Email
	private String email;
	@NotEmpty
	private String projectName;
	@NotEmpty
	private String discription;
	@NotEmpty
	private String problemSolve;
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
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
    @OneToMany(mappedBy = "preSeed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingTwo> bookings;
}
