package com.demo.project.controllers;

import java.util.List;

import com.demo.project.DTOS.StartupDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.DTOS.PreSeedDTO;
import com.demo.project.models.PreSeed;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.JwtService;
import com.demo.project.services.PreSeedService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PreSeedController {

    private final PreSeedService preSeedService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // Get all pre-seed investments
    @GetMapping("/all/preseeds")
    public List<PreSeedDTO> getAllPreSeedsDTO() {
        return preSeedService.getAllPreSeedsDTO();
    }

    // Create a new pre-seed investment
    @PostMapping("/new/preseed")
    public PreSeedDTO createPreSeed(@RequestBody PreSeed preSeed, HttpServletRequest request) {
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
                        preSeed.setUser(user); // Set the user for the pre-seed investment
                        return preSeedService.createPreSeed(preSeed);
                    })
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }


    // Get a specific pre-seed investment by ID
    @GetMapping("/preseed/{id}")
    public PreSeedDTO getPreSeedById(@PathVariable("id") Long id) {
        return preSeedService.getPreSeedByIdDTO(id);
    }

    // Update an existing pre-seed investment
    @PutMapping("/preseed/{id}")
    public PreSeedDTO updatePreSeed(@PathVariable("id") Long id, @RequestBody PreSeed preSeed) {
        return preSeedService.updatePreSeed(id, preSeed);
    }

    @GetMapping("/preseed/user/{id}")
    public PreSeedDTO getPreseedByUserId(@PathVariable("id") Long id) {
        return preSeedService.getPreseedByUserId(id);
    }
}
