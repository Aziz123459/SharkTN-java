package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;

import com.demo.project.models.Investor;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.PreSeed;

public interface PreSeedRepository extends  CrudRepository<PreSeed,Long>{
	List<PreSeed> findAll();

    Optional<PreSeed> findByUserId(Long id);
}


