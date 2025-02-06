package com.demo.project.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import com.demo.project.DTOS.StartupDTO;
import com.demo.project.DTOS.UserDTO;
import com.demo.project.models.Role;
import com.demo.project.models.Startup;
import com.demo.project.models.User;
import com.demo.project.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * Retrieves all users from the repository and maps them to UserDTOs.
     *
     * @return List of UserDTOs representing all users
     */
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Retrieves users by their role and maps them to UserDTOs.
     *
     * @param role the role to filter users by
     * @return List of UserDTOs representing users with the specified role
     */
    public List<UserDTO> getUsersByRole(Role role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
    
    
    public List<UserDTO> getUserById(Long id) {
        return userRepository.findById(id).stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
    
    
    public UserDTO updateUser(Long id, User user){
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()){
        	User oldUser = optionalUser.get();
            if (user.getFullname() != null){
            	oldUser.setFullname(user.getFullname());
            }
            if (user.getPhone() != null){
            	oldUser.setPhone(user.getPhone());
            }
            if (user.getAdress() != null){
            	oldUser.setAdress(user.getAdress());
            }
            // finish all the entities in the model
            return convertEntityToDto(userRepository.save(oldUser));

        }else {
            return null;
        }
    }
    
    /**
     * Converts a User entity to a UserDTO.
     *
     * @param user the User entity to convert
     * @return the corresponding UserDTO
     */
    public UserDTO convertEntityToDto(User user) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(user, UserDTO.class);
    }

    /**
     * Converts a UserDTO to a User entity.
     *
     * @param userDTO the UserDTO to convert
     * @return the corresponding User entity
     */
    public User convertDtoToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

}