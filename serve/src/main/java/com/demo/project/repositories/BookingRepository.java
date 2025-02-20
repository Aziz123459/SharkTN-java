    package com.demo.project.repositories;

    import com.demo.project.models.Booking;
    import org.springframework.data.repository.CrudRepository;
    import java.util.List;

    public interface BookingRepository extends CrudRepository<Booking,Long> {
        List<Booking> findAll();
    }
