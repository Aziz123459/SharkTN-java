package com.demo.project.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.PreSeed;

public interface PreSeedRepository extends  CrudRepository<PreSeed,Long>{
	List<PreSeed> findAll();
}


