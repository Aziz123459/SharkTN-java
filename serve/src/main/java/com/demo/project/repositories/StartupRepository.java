package com.demo.project.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Startup;

public interface StartupRepository extends CrudRepository<Startup,Long>{
	//find all Startup 
	List<Startup> findAll();
}