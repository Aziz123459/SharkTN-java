package com.demo.project.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.project.models.PreSeed;
import com.demo.project.models.Startup;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.DTOS.IncubatorDTO;
import com.demo.project.models.Incubator;
import com.demo.project.models.Investor;
import com.demo.project.repositories.IncubatorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncubatorService {
private final ModelMapper modelMapper;
private final IncubatorRepository incubatorRepo;


public List<IncubatorDTO>getAllIncubatorsDTO(){
	return incubatorRepo.findAll()
			.stream().map(this::convertEntityToDto)
			.collect(Collectors.toList());
}
public IncubatorDTO createIncubator(Incubator incubator){
	Incubator newIncubator = incubatorRepo.save(incubator);

    return convertEntityToDto(newIncubator);
}

//findOneById
public IncubatorDTO getIncubatorByIdDTO(Long id){
    return convertEntityToDto(incubatorRepo.findById(id).get());
}

public IncubatorDTO updateIncubator(Long id, Incubator incubator){
    Optional<Incubator> optionalIncubator = incubatorRepo.findById(id);
    if (optionalIncubator.isPresent()){
    	Incubator oldIncubator = optionalIncubator.get();
        if (incubator.getMessage() != null){
        	oldIncubator.setMessage(incubator.getMessage());
        }
        // finish all the entities in the model
        return convertEntityToDto(incubatorRepo.save(oldIncubator));

    }else {
        return null;
    }
}

    public IncubatorDTO getIncubatorByUserId(Long id) {
        return incubatorRepo.findByUserId(id)
                .map(this::convertEntityToDto)
                .orElseThrow(() -> new RuntimeException("Incubator not found"));
    }

public IncubatorDTO convertEntityToDto(Incubator incubator) {
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
    return modelMapper.map(incubator, IncubatorDTO.class);
}


    public Incubator getIncubatorById(Long id){
        return incubatorRepo.findById(id).get();
    }

    public Incubator getIncubatorByUserIdEntity(Long id) {
        return incubatorRepo.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("PreSeed not found"));
    }


public Investor convertDtoToEntity(IncubatorDTO incubatorDTO) {
    return modelMapper.map(incubatorDTO, Investor.class);
}
}
