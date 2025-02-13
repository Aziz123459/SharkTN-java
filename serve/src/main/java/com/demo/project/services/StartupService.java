package com.demo.project.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.demo.project.DTOS.StartupWithHisUserDTO;
import com.demo.project.models.Investor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.DTOS.StartupDTO;
import com.demo.project.models.Startup;
import com.demo.project.repositories.StartupRepository;
import com.demo.project.repositories.UserRepository;

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
            if (startup.getTeamNumber() > 0){
            	oldStartup.setTeamNumber(startup.getTeamNumber());
            }
            if (startup.getIndustry() != null){
            	oldStartup.setIndustry(startup.getIndustry());
            }
            if (startup.getBriefDescription() != null){
            	oldStartup.setBriefDescription(startup.getBriefDescription());
            }
            if (startup.getUploadBusinessRegistrationCertificate() != null){
                oldStartup.setUploadBusinessRegistrationCertificate(startup.getUploadBusinessRegistrationCertificate());
            }
            if (startup.getUploadGovernmentIssuedID() != null){
                oldStartup.setUploadGovernmentIssuedID(startup.getUploadGovernmentIssuedID());
            }
            if (startup.getBusinessRegistrationNumber() != null){
                oldStartup.setBusinessRegistrationNumber(startup.getBusinessRegistrationNumber());
            }
            // finish all the entities in the model
            return convertEntityToDto(startupRepo.save(oldStartup));

        }else {
            return null;
        }
    }

    public StartupDTO acceptStartup(Long id){
        Startup optionalStartup = startupRepo.findById(id).get();
        optionalStartup.setStatus(1);
        System.out.println(optionalStartup.getStatus());
        Startup accepted=startupRepo.save(optionalStartup);
        return convertEntityToDto(accepted);
        }

    public StartupDTO denyStartup(Long id){
        Startup optionalStartup = startupRepo.findById(id).get();
        optionalStartup.setStatus(2);
        System.out.println(optionalStartup.getStatus());
        Startup denied=startupRepo.save(optionalStartup);
        return convertEntityToDto(denied);
    }

    public StartupDTO getStartupBackToPending(Long id){
        Startup optionalStartup = startupRepo.findById(id).get();
        optionalStartup.setStatus(0);
        System.out.println(optionalStartup.getStatus());
        Startup pending=startupRepo.save(optionalStartup);
        return convertEntityToDto(pending);
    }

    public List<StartupWithHisUserDTO> getAllStartupsWithHisUsersDTO(){
        return startupRepo.findAll()
                .stream().map(this::convertEntityToDtoWithUsers)
                .collect(Collectors.toList());
    }
	
	public StartupDTO getStartupByUserId(Long id) {
        return startupRepo.findByUserId(id)
                .map(this::convertEntityToDto)
                .orElseThrow(() -> new RuntimeException("Startup not found"));
    }
    public Startup getStartupByUserIdEntity(Long id) {
        return startupRepo.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("Startup not found"));
    }
    public StartupDTO getStartupDTOByUserIdEntity(Long id) {
        return startupRepo.findByUserId(id)
                .map(this::convertEntityToDto)
                .orElseThrow(() -> new RuntimeException("Startup not found"));
    }
	
    public StartupDTO convertEntityToDto(Startup startup) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(startup, StartupDTO.class);
    }

    public StartupWithHisUserDTO convertEntityToDtoWithUsers(Startup startup) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(startup, StartupWithHisUserDTO.class);
    }
    public Startup convertDtoToEntity(StartupDTO startupDTO) {
        return modelMapper.map(startupDTO, Startup.class);
    }
    public Startup getStartupById(Long id){
        return startupRepo.findById(id).get();
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
