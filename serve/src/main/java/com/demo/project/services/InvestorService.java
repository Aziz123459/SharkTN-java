package com.demo.project.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.DTOS.InvestorDTO;
import com.demo.project.models.Investor;
import com.demo.project.repositories.InvestorRepository;
import com.demo.project.repositories.UserRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class InvestorService {
	
    private final ModelMapper modelMapper;
    private final InvestorRepository investorRepo;
    private final UserRepository userRepository;
    private final JwtService jwtService;
	
	// get all startups 
    public List<InvestorDTO> getAllInvestorsDTO(){
        return investorRepo.findAll()
        		.stream().map(this::convertEntityToDto)
        		.collect(Collectors.toList());
    }
	
    //Create Startup
	public InvestorDTO createInvestor(Investor investor){
		Investor newInvestor = investorRepo.save(investor);

        return convertEntityToDto(newInvestor);
    }
	
	//findOneById
	public InvestorDTO getInvestorByIdDTO(Long id){
        return convertEntityToDto(investorRepo.findById(id).get());
    }
	
	public InvestorDTO updateInvestor(Long id, Investor investor){
        Optional<Investor> optionalInvestor = investorRepo.findById(id);
        if (optionalInvestor.isPresent()){
        	Investor oldInvestor = optionalInvestor.get();
            if (investor.getMessage() != null){
            	oldInvestor.setMessage(investor.getMessage());
            }
            // finish all the entities in the model
            return convertEntityToDto(investorRepo.save(oldInvestor));

        }else {
            return null;
        }
    }
	
    public InvestorDTO convertEntityToDto(Investor investor) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(investor, InvestorDTO.class);
    }

    public Investor convertDtoToEntity(InvestorDTO investorDTO) {
        return modelMapper.map(investorDTO, Investor.class);
    }

	
//	// add to favorites
//	public void addToFavorites(Long userId,Long startupId) {
//		// find user by id 
//		User currentUser = userServ.getUserById(userId);
//		//find startup by id 
//		Investor investor = findById(startupId);
//		
//		if(currentUser!=null && investor!=null) {
//			investor.getAddToTheirFavourite().add(currentUser);
//			investorRepo.save(investor);
//		}
//		
//	}
//	
//	//Remove from favorite
//	public void removeFromFavorites(Long userId,Long startupId) {
//		// find user by id 
//		User currentUser = userServ.getUserById(userId);
//		//find startup by id 
//		Investor investor = findById(startupId);
//		
//		if(currentUser!=null && investor!=null) {
//			
//			investor.getAddToTheirFavourite().remove(currentUser);
//			investorRepo.save(investor);
//		}
//		
//	}

	
}