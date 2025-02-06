package com.demo.project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.DTOS.IncubatorDTO;
import com.demo.project.models.Incubator;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.IncubatorService;
import com.demo.project.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class IncubatorController {
private final IncubatorService incubatorService;
private final UserRepository userRepository;
private final JwtService jwtService;

@GetMapping("/all/incubators")
public List<IncubatorDTO> getAllIncubatorsDTO(){
    return incubatorService.getAllIncubatorsDTO();
}
@PostMapping("/new/incubator")
public IncubatorDTO createInvestor(@RequestBody Incubator incubator, HttpServletRequest request){
    // Extract token from Authorization header
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);
        Long userId = jwtService.extractUserId(token);
        if (userRepository.findById(userId).isPresent()) { 
            User user = userRepository.findById(userId).get();
            incubator.setUser(user);
            return incubatorService.createIncubator(incubator);
        }
        throw new RuntimeException("User not found");
    }
    throw new RuntimeException("Authorization header is missing or invalid");
}
@GetMapping("/incubator/{id}")
public IncubatorDTO getOneInCubator(@PathVariable("id") Long id){
    return incubatorService.getIncubatorByIdDTO(id);
}
@PutMapping("incubator/edit/{id}")
public IncubatorDTO updateIncubator(@PathVariable("id") Long id, @RequestBody Incubator incubator){
    return incubatorService.updateIncubator(id, incubator);
}
}
