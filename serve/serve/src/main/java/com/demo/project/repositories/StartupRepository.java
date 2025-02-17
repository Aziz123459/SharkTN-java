package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Startup;

public interface StartupRepository extends CrudRepository<Startup,Long>{
	//find all Startup 
	List<Startup> findAll();
	
	//find startup by userid
	@Query("SELECT s FROM Startup s WHERE s.user.id= ?1")
    Optional<Startup> findByUserId(Long id);
}