package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;
import java.util.Optional;

import com.demo.project.models.Investor;
import com.demo.project.models.Startup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.PreSeed;

public interface PreSeedRepository extends  CrudRepository<PreSeed,Long>{
	List<PreSeed> findAll();

	@Query("SELECT p FROM PreSeed p WHERE p.user.id= ?1")
	Optional<PreSeed> findByUserId(Long id);
}


