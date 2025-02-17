package com.demo.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Booking date is required")
    @Temporal(TemporalType.TIMESTAMP) // Meeting time should be a timestamp
    private Date bookingDate;

    @Column(updatable = false)
    private Date createdAt;
    private Date updatedAt;

    // Many bookings can belong to one investor
    @ManyToOne
    @JoinColumn(name = "investor_id")
    private Investor investor;

    // Many bookings can belong to one startup
    @ManyToOne
    @JoinColumn(name = "startup_id")
    private Startup startup;

    // Many bookings can belong to one investor

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
