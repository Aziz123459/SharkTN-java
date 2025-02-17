package com.demo.project.controllers;

import java.util.List;

import com.demo.project.DTOS.StartupWithHisUserDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.DTOS.StartupDTO;
import com.demo.project.models.Startup;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.JwtService;
import com.demo.project.services.StartupService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor

public class StartupController {
    private final StartupService startupService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/all/startups")
    public List<StartupDTO> getAllStartupsDTO(){
        return startupService.getAllStartupsDTO();
    }

    @GetMapping("/all/startups/users")
    public List<StartupWithHisUserDTO> getAllStartupsWithUsersDTO(){
        return startupService.getAllStartupsWithHisUsersDTO();
    }

    @PostMapping("/startup/new")
    public StartupDTO createStartup(@RequestBody Startup startup, HttpServletRequest request) {
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
                        startup.setUser(user);
                        return startupService.createStartup(startup);
                    })
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }


    @PutMapping("/startup/{id}")
    public StartupDTO updateStartup(@PathVariable("id") Long id, @RequestBody Startup startup){
        return startupService.updateStartup(id, startup);
    }

    @GetMapping("/startup/{id}")
    public StartupDTO getOneStartup(@PathVariable("id") Long id){
        return startupService.getStartupByIdDTO(id);
    }
    
    @GetMapping("/startup/user/{id}")
    public StartupDTO getStartupByUserId(@PathVariable("id") Long id) {
    	return startupService.getStartupByUserId(id);
    }

    @PutMapping("/admin/accept/{id}")
    public StartupDTO acceptStartup(@PathVariable("id") Long id) {
        return startupService.acceptStartup(id);
    }

    @PutMapping("/admin/deny/{id}")
    public StartupDTO denyStartup(@PathVariable("id") Long id) {
        return startupService.denyStartup(id);
    }

    @PutMapping("/startup/pending/{id}")
    public StartupDTO getStartupBackToPending(@PathVariable("id") Long id) {
        return startupService.getStartupBackToPending(id);
    }

}
