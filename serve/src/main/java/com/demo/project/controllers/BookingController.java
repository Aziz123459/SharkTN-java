package com.demo.project.controllers;



import com.demo.project.DTOS.BookingDTO;
import com.demo.project.models.Booking;
import com.demo.project.models.User;
import com.demo.project.services.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/booking/create/investor/{investor_id}")
    public ResponseEntity<BookingDTO> createBooking(@PathVariable Long investor_id, @RequestBody Booking booking, HttpServletRequest req) {
        // Find the user from the provided user_id


        // Save the booking
        BookingDTO newBooking = bookingService.createBooking(booking,investor_id,req);
        return ResponseEntity.ok(newBooking);
    }
    @PostMapping("/booking/create/startup/{startup_id}")
    public ResponseEntity<BookingDTO> createBooking2(@PathVariable Long startup_id, @RequestBody Booking booking, HttpServletRequest req) {
        // Find the user from the provided user_id


        // Save the booking
        BookingDTO newBooking = bookingService.createBooking2(booking,startup_id,req);
        return ResponseEntity.ok(newBooking);
    }
    @GetMapping("/booking/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/booking/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/booking/startup")
    public ResponseEntity<List<BookingDTO>> getBookingsForStartup(HttpServletRequest req) {
        return ResponseEntity.ok(bookingService.getAllBookingsForStartup(req));
    }

    @GetMapping("/booking/investor")
    public ResponseEntity<List<BookingDTO>> getBookingsForInvestor(HttpServletRequest req) {
        return ResponseEntity.ok(bookingService.getAllBookingsForInvestor(req));
    }
    @DeleteMapping("/booking/delete/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}