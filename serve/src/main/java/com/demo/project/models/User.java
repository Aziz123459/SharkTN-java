package com.demo.project.models;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
public class User implements UserDetails {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotNull(message="the userName Should not be empty")
	@Size(min=3,message="userName should be at least 3 characters ")
	private String fullname;
	
	@Email
	private String email;
	
	@Size(min=8,message="the password must be at least 8 characters")
	private String password;
	@Transient
	@Size(min=8,message="the password must be at least 8 characters")
	private String confirm;
	
	@NotNull(message="Date of Birth  is required")
	private Date birth;
    @NotEmpty(message = "Phone Number is required")
    @Pattern(regexp = "\\d{8}", message = "Phone Number must be exactly 8 digits")
    private String phone;
	
    @NotNull
    private String adress;
	private String profile;
	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 50)
	private Role role;
	
	@Column(updatable = false)
    private Date createdAt;
	
    private Date updatedAt;
    @OneToOne(mappedBy = "user")
    private Investor investor;

    @OneToOne(mappedBy = "user")
    private Startup startup;
   
	@PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }
	@Override

    public boolean isAccountNonLocked() {
        return true;
    }
	@Override

    public boolean isCredentialsNonExpired() {
        return true;
    }
	@Override

    public boolean isEnabled() {
        return true;
    }
}
