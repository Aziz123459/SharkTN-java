package com.demo.project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.DTOS.InvestorDTO;
import com.demo.project.models.Investor;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;
import com.demo.project.services.InvestorService;
import com.demo.project.services.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor

public class InvestorController {
    private final InvestorService investorService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/all/investors")
    public List<InvestorDTO> getAllInvestorsDTO(){
        return investorService.getAllInvestorsDTO();
    }

    @PostMapping("/new/investor")
    public InvestorDTO createInvestor(@RequestBody Investor investor, HttpServletRequest request){
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            if (userRepository.findById(userId).isPresent()) { 
                User user = userRepository.findById(userId).get();
                investor.setUser(user);
                return investorService.createInvestor(investor);
            }
            throw new RuntimeException("User not found");
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }

    @PutMapping("investor/edit/{id}")
    public InvestorDTO updateInvestor(@PathVariable("id") Long id, @RequestBody Investor investor){
        return investorService.updateInvestor(id, investor);
    }

    @GetMapping("/investor/{id}")
    public InvestorDTO getOneInvestor(@PathVariable("id") Long id){
        return investorService.getInvestorByIdDTO(id);
    }
}