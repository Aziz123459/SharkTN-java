package com.demo.project.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.demo.project.models.Investor;

public interface InvestorRepository extends CrudRepository<Investor,Long>{
	//find all investors 
	List<Investor> findAll();
}