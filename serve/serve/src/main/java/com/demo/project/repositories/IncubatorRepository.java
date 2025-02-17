package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;

import aj.org.objectweb.asm.commons.Remapper;
import com.demo.project.models.PreSeed;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Incubator;

public interface IncubatorRepository extends CrudRepository<Incubator,Long>{
	
	List<Incubator> findAll();

	@Query("SELECT i FROM Incubator i WHERE i.user.id= ?1")
	Optional<Incubator> findByUserId(Long id);
} 


