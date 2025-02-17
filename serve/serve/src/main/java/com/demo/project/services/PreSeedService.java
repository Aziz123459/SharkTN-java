package com.demo.project.services;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.project.models.Incubator;
import com.demo.project.DTOS.StartupDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.DTOS.InvestorDTO;
import com.demo.project.DTOS.PreSeedDTO;
import com.demo.project.models.Investor;
import com.demo.project.models.PreSeed;
import com.demo.project.repositories.PreSeedRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PreSeedService {

    private final ModelMapper modelMapper;
    private final PreSeedRepository preSeedRepo;

    // Get all pre-seed investments
    public List<PreSeedDTO> getAllPreSeedsDTO() {
        return preSeedRepo.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    // Create PreSeed investment
    public PreSeedDTO createPreSeed(PreSeed preSeed) {
        PreSeed newPreSeed = preSeedRepo.save(preSeed);
        return convertEntityToDto(newPreSeed);
    }

    // Find PreSeed by ID
    public PreSeedDTO getPreSeedByIdDTO(Long id) {

        return convertEntityToDto(preSeedRepo.findById(id).orElse(null));
    }

    // Update PreSeed investment
    public PreSeedDTO updatePreSeed(Long id, PreSeed preSeed) {
        Optional<PreSeed> optionalPreSeed = preSeedRepo.findById(id);
        if (optionalPreSeed.isPresent()) {
            PreSeed oldPreSeed = optionalPreSeed.get();
            if (preSeed.getEmail() != null) {
                oldPreSeed.setEmail(preSeed.getEmail());
            }
            if (preSeed.getProjectName() != null) {
                oldPreSeed.setProjectName(preSeed.getProjectName());
            }
            if (preSeed.getDiscription() != null) {
                oldPreSeed.setDiscription(preSeed.getDiscription());
            }
            if (preSeed.getProblemSolve() != null) {
                oldPreSeed.setProblemSolve(preSeed.getProblemSolve());
            }
            return convertEntityToDto(preSeedRepo.save(oldPreSeed));
        } else {
            return null;
        }
    }

    public PreSeedDTO getPreseedByUserId(Long id) {
        return preSeedRepo.findByUserId(id)
                .map(this::convertEntityToDto)
                .orElseThrow(() -> new RuntimeException("Preseed not found"));
    }

    // Convert PreSeed entity to DTO
    public PreSeedDTO convertEntityToDto(PreSeed preSeed) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(preSeed, PreSeedDTO.class);
    }

    // Convert PreSeed DTO to entity
    public PreSeed convertDtoToEntity(PreSeedDTO preSeedDTO) {
        PreSeed preSeed = modelMapper.map(preSeedDTO, PreSeed.class);
        // You may need to set the user based on userId if necessary
        return preSeed;
    }
    public  PreSeed getPreSeedByUserIdEntity(Long id) {
        return preSeedRepo.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("PreSeed not found"));
    }
    public PreSeed getPreSeedById(Long id){
        return preSeedRepo.findById(id).get();
    }
}