package com.demo.project.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Incubator;

public interface IncubatorRepository extends CrudRepository<Incubator,Long>{
	
	List<Incubator> findAll();
} 


