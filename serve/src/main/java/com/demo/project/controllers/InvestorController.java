package com.demo.project.controllers;

import java.util.List;

import com.demo.project.DTOS.InvestorWithUserDTO;
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

import com.demo.project.DTOS.InvestorDTO;
import com.demo.project.DTOS.StartupDTO;
import com.demo.project.models.Investor;
import com.demo.project.models.Startup;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.InvestorService;
import com.demo.project.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor

public class InvestorController {
    private final InvestorService investorService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/all/investors")
    public List<InvestorDTO> getAllInvestorsDTO(){
        return investorService.getAllInvestorsDTO();
    }

    @GetMapping("/all/investors/users")
    public List<InvestorWithUserDTO> getAllInvestorsWithUsersDTO(){
        return investorService.getAllInvestorsWithHisUsersDTO();
    }

    @PostMapping("/investor/new")
    public InvestorDTO createInvestor(@RequestBody Investor investor, HttpServletRequest request) {
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
                        investor.setUser(user);
                        return investorService.createInvestor(investor);
                    })
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }

    @PatchMapping("investor/{id}")
    public InvestorDTO updateInvestor(@PathVariable("id") Long id, @RequestBody Investor investor){
        return investorService.updateInvestor(id, investor);
    }

    @GetMapping("/investor/{id}")
    public InvestorDTO getOneInvestor(@PathVariable("id") Long id){
        return investorService.getInvestorByIdDTO(id);
    }
    
    @GetMapping("/investor/user/{id}")
    public InvestorDTO getInvestorByUserId(@PathVariable("id") Long id) {
    	return investorService.getInvestorByUserId(id);
    }
}