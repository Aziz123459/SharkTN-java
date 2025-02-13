package com.demo.project.services;

import com.demo.project.DTOS.BookingTwoDTO;
import com.demo.project.models.BookingTwo;
import com.demo.project.models.Incubator;
import com.demo.project.models.PreSeed;
import com.demo.project.repositories.BookingTwoRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingTwoService {
    private final BookingTwoRepository bookingTwoRepository;
    private final JwtService jwtService;
    private final IncubatorService incubatorService;
    private final ModelMapper modelMapper;
    private final PreSeedService preSeedService;
    public BookingTwoDTO createBooking3(BookingTwo bookingTwo, Long incubator_id, HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            PreSeed preSeed= preSeedService.getPreSeedByUserIdEntity(userId);
            bookingTwo.setIncubator(incubatorService.getIncubatorById(incubator_id));
            bookingTwo.setPreSeed(preSeed);

            return convertEntityToDto(bookingTwoRepository.save(bookingTwo));

        }
        return convertEntityToDto(bookingTwoRepository.save(bookingTwo));
    }

    public BookingTwoDTO createBooking4(BookingTwo bookingTwo, Long preSeed_id, HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Incubator incubator= incubatorService.getIncubatorByUserIdEntity(userId);
            bookingTwo.setPreSeed(preSeedService.getPreSeedById(preSeed_id));
            bookingTwo.setIncubator(incubator);

            return convertEntityToDto(bookingTwoRepository.save(bookingTwo));

        }
        return convertEntityToDto(bookingTwoRepository.save(bookingTwo));
    }

    // ✅ Get all bookings where the incubator belongs to the connected user
    public List<BookingTwoDTO> getAllBookingsForIncubator(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Incubator incubator = incubatorService.getIncubatorByUserIdEntity(userId);

            return bookingTwoRepository.findAll().stream()
                    .filter(booking -> booking.getIncubator().getId().equals(incubator.getId()))
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }

    // ✅ Get all bookings where the preseed belongs to the connected user
    public List<BookingTwoDTO> getAllBookingsForPreseed(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            PreSeed preseed = preSeedService.getPreSeedByUserIdEntity(userId);

            return bookingTwoRepository.findAll().stream()
                    .filter(booking -> booking.getPreSeed().getId().equals(preseed.getId()))
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }


    public List<BookingTwo> getAllBookings() {
        return bookingTwoRepository.findAll();
    }

    public Optional<BookingTwo> getBookingById(Long bookingId) {
        return bookingTwoRepository.findById(bookingId);
    }

    public void deleteBooking(Long bookingId) {
        bookingTwoRepository.deleteById(bookingId);
    }
    public BookingTwoDTO convertEntityToDto(BookingTwo bookingTwo) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(bookingTwo, BookingTwoDTO.class);
    }
}
