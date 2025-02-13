package com.demo.project.repositories;

import com.demo.project.models.BookingTwo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookingTwoRepository extends CrudRepository<BookingTwo,Long> {
    List<BookingTwo> findAll();
}
