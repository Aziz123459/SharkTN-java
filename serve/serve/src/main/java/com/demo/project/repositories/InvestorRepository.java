package com.demo.project.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Investor;
import com.demo.project.models.Startup;

public interface InvestorRepository extends CrudRepository<Investor,Long>{
	//find all investors 
	List<Investor> findAll();
	@Query("SELECT i FROM Investor i WHERE i.user.id= ?1")
    Optional<Investor> findByUserId(Long id);
}