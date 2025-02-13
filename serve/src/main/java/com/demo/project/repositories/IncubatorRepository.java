package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;

import aj.org.objectweb.asm.commons.Remapper;
import com.demo.project.models.PreSeed;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Incubator;

public interface IncubatorRepository extends CrudRepository<Incubator,Long>{
	
	List<Incubator> findAll();

    Optional<Incubator> findByUserId(Long id);
} 


