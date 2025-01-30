package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.project.models.Role;
import com.demo.project.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
 Optional <User> findByEmail(String email);
 //find by role
 List<User> findByRole(Role role);
 List<User> findAll();
}
