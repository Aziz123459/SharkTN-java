package com.demo.project.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	public AuthenticationResponse register(RegisterRequest request) {
		// TODO Auto-generated method stub
		var user =User.builder()
				.fullname(request.getFullname())
				.birth(request.getBirth())
				.confirm(request.getConfirm())
				.password(passwordEncoder.encode(request.getPassword()))
				.phone(request.getPhone())
				.email(request.getEmail())
				.role(request.getRole())
				.adress(request.getAdress())
				.build();
		repository.save(user);
		var jwtToken= jwtService.generateToken(user, user.getId());
		var id =user.getId();
		return AuthenticationResponse.builder()
				.role(user.getRole())
				.token(jwtToken)
				.id(id)
				.build();
	}

	public  AuthenticationResponse authenticate(AuthenticationRequest request) {
		// TODO Auto-generated method stub
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
						)
				);
		var user=repository.findByEmail(request.getEmail())
				.orElseThrow();
		var jwtToken= jwtService.generateToken(user, user.getId());
		var role=user.getRole();
		var id =user.getId();
		return AuthenticationResponse.builder()
				.id(id)
				.token(jwtToken)
				.role(role)
				.build();
	}

}
