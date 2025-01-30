package com.demo.project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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
@RequiredArgsConstructor

public class StartupController {
    private final StartupService startupService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/all/startups")
    public List<StartupDTO> getAllStartupsDTO(){
        return startupService.getAllStartupsDTO();
    }

    @PostMapping("/new/startup")
    public StartupDTO createStartup(@RequestBody Startup startup, HttpServletRequest request){
        // Extract token from Authorization header
    	System.out.print("+++++++++++++++++++++++"+startup);
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) {
                User user = userRepository.findById(userId).get();
                startup.setUser(user);
                return startupService.createStartup(startup);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }

    @PutMapping("/startupProfile/edit/{id}")
    public StartupDTO updateStartup(@PathVariable("id") Long id, @RequestBody Startup startup){
        return startupService.updateStartup(id, startup);
    }

    @GetMapping("/startup/{id}")
    public StartupDTO getOneStartup(@PathVariable("id") Long id){
        return startupService.getStartupByIdDTO(id);
    }
}
