package com.demo.project.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.models.Startup;
import com.demo.project.repositories.StartupRepository;
import com.demo.project.repositories.UserRepository;

import DTOS.StartupDTO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StartupService {
	
    private final ModelMapper modelMapper;
    private final StartupRepository startupRepo;
    private final UserRepository userRepository;
    private final JwtService jwtService;

	// get all startups 
    public List<StartupDTO> getAllStartupsDTO(){
        return startupRepo.findAll()
        		.stream().map(this::convertEntityToDto)
        		.collect(Collectors.toList());
    }
	
    //Create Startup
	public StartupDTO createStartup(Startup startup){
		Startup newStartup = startupRepo.save(startup);

        return convertEntityToDto(newStartup);
    }
	
	//findOneById
	public StartupDTO getStartupByIdDTO(Long id){
        return convertEntityToDto(startupRepo.findById(id).get());
    }
	
	public StartupDTO updateStartup(Long id, Startup startup){
        Optional<Startup> optionalStartup = startupRepo.findById(id);
        if (optionalStartup.isPresent()){
        	Startup oldStartup = optionalStartup.get();
            if (startup.getStartupName() != null){
            	oldStartup.setStartupName(startup.getStartupName());
            }
            // finish all the entities in the model
            return convertEntityToDto(startupRepo.save(oldStartup));

        }else {
            return null;
        }
    }
	
    public StartupDTO convertEntityToDto(Startup startup) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(startup, StartupDTO.class);
    }

    public Startup convertDtoToEntity(StartupDTO startupDTO) {
        return modelMapper.map(startupDTO, Startup.class);
    }
	
//	// add to favorites
//	public void addToFavorites(Long userId,Long startupId) {
//		// find user by id 
//		User currentUser = userServ.getUserById(userId);
//		//find startup by id 
//		Startup startup = findById(startupId);
//		
//		if(currentUser!=null && startup!=null) {
//			startup.getAddToTheirFavourite().add(currentUser);
//			startupRepo.save(startup);
//		}
//		
//	}
//	
//	//Remove from favorite
//	public void removeFromFavorites(Long userId,Long startupId) {
//		// find user by id 
//		User currentUser = userServ.getUserById(userId);
//		//find startup by id 
//		Startup startup = findById(startupId);
//		
//		if(currentUser!=null && startup!=null) {
//			
//			startup.getAddToTheirFavourite().remove(currentUser);
//			startupRepo.save(startup);
//		}
//		
//	}
	
	
	
	
	
}
