package com.demo.project.controllers;

import java.util.List;

import com.demo.project.DTOS.PreSeedDTO;
import org.springframework.web.bind.annotation.*;

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
@CrossOrigin(origins = "http://localhost:4200")
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
    public IncubatorDTO createIncubator(@RequestBody Incubator incubator, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);

            System.out.println("Extracted User ID: " + userId); // ✅ Debug log

            if (userId == null) {
                throw new RuntimeException("Failed to extract user ID from token.");
            }

            return userRepository.findById(userId)
                    .map(user -> {
                        incubator.setUser(user);
                        return incubatorService.createIncubator(incubator);
                    })
                    .orElseThrow(() -> new RuntimeException("User not found"));
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

    @GetMapping("/incubator/user/{id}")
    public IncubatorDTO getIncubatorByUserId(@PathVariable("id") Long id) {
        return incubatorService.getIncubatorByUserId(id);
    }
}
