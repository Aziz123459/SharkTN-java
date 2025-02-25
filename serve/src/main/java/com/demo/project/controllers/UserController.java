package com.demo.project.controllers;

import java.util.List;
import java.util.Map;

import com.demo.project.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.project.DTOS.UserDTO;
import com.demo.project.models.Role;
import com.demo.project.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {
	 private final UserService userService;

	    /**
	     * Endpoint to retrieve all users.
	     *
	     * @return List of UserDTO containing details of all users
	     */
	    @GetMapping("/admin/user/all")
	    public List<UserDTO> getAllUsersDTO() {
	        return userService.getAllUsers();
	    }

	    /**
	     * Endpoint to retrieve users filtered by their role.
	     *
	     * @param role the role to filter users by
	     * @return List of UserDTO containing details of users with the specified role
	     */
	    @GetMapping("/user/role/{role}")
	    public List<UserDTO> getUsersByRole(@PathVariable("role") Role role) {
	        return userService.getUsersByRole(role);
	    }
//	    @DeleteMapping("/delete/{id}")
//	    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
//	        return userService.deleteUser(id);
//	    }

		@GetMapping("/profile/{id}")
		public List<UserDTO> getProfile(@PathVariable("id") Long id){
			return userService.getUserById(id);
		}

		@PatchMapping("/profile/{id}")
		public UserDTO updateUser(@PathVariable("id") Long id, @RequestBody User user){
			return userService.updateUser(id, user);
		}

		@DeleteMapping("/delete/{id}")
		public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
			return userService.deleteUser(id);
		}

}
