package com.demo.project.services;

import com.demo.project.DTOS.BookingDTO;
import com.demo.project.DTOS.InvestorDTO;
import com.demo.project.DTOS.StartupDTO;
import com.demo.project.models.Booking;
import com.demo.project.models.Investor;
import com.demo.project.models.PreSeed;
import com.demo.project.models.Startup;
import com.demo.project.repositories.BookingRepository;
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
public class BookingService {
    private final BookingRepository bookingRepository;
    private final JwtService jwtService;
    private final  StartupService startupService;
    private  final InvestorService investorService;
    private final ModelMapper modelMapper;

    public BookingDTO createBooking(Booking booking, Long investor_id, HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Startup startup= startupService.getStartupByUserIdEntity(userId);
            booking.setInvestor(investorService.getInvestorById(investor_id));
            booking.setStartup(startup);

            return convertEntityToDto(bookingRepository.save(booking));

        }
        return convertEntityToDto(bookingRepository.save(booking));
    }

    public BookingDTO createBooking2(Booking booking, Long startup_id, HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Investor investor= investorService.getInvestorByUserIdEntity(userId);
            booking.setStartup(startupService.getStartupById(startup_id));
            booking.setInvestor(investor);

            return convertEntityToDto(bookingRepository.save(booking));

        }
        return convertEntityToDto(bookingRepository.save(booking));
    }



    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
    public BookingDTO convertEntityToDto(Booking booking) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(booking, BookingDTO.class);
    }
    // ✅ Get all bookings where the startup belongs to the connected user
    public List<BookingDTO> getAllBookingsForStartup(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Startup startup = startupService.getStartupByUserIdEntity(userId);

            return bookingRepository.findAll().stream()
                    .filter(booking -> booking.getStartup().getId().equals(startup.getId()))
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }

    // ✅ Get all bookings where the investor is the connected user
    public List<BookingDTO> getAllBookingsForInvestor(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            Long userId = jwtService.extractUserId(token);
            Investor investor = investorService.getInvestorByUserIdEntity(userId);

            return bookingRepository.findAll().stream()
                    .filter(booking -> booking.getInvestor().getId().equals(investor.getId()))
                    .map(this::convertEntityToDto)
                    .collect(Collectors.toList());
        }
        throw new RuntimeException("Authorization header is missing or invalid");
    }
    //public Investor convertDtoToEntity(InvestorDTO investorDTO) {
    //return modelMapper.map(investorDTO, Investor.class);
    //}
}
