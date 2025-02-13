package com.demo.project.controllers;

import com.demo.project.DTOS.BookingTwoDTO;
import com.demo.project.models.BookingTwo;
import com.demo.project.services.BookingTwoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BookingTwoController {
    private final BookingTwoService bookingTwoService;
    @PostMapping("/booking/create/incubator/{incubator_id}")
    public ResponseEntity<BookingTwoDTO> createBooking(@PathVariable Long incubator_id, @RequestBody BookingTwo bookingTwo, HttpServletRequest req) {
        // Find the user from the provided user_id


        // Save the booking
        BookingTwoDTO newBooking = bookingTwoService.createBooking3(bookingTwo,incubator_id,req);
        return ResponseEntity.ok(newBooking);
    }

    @PostMapping("/booking/create/preSeed/{preSeed_id}")
    public ResponseEntity<BookingTwoDTO> createBooking2(@PathVariable Long preSeed_id, @RequestBody BookingTwo bookingTwo, HttpServletRequest req) {
        // Find the user from the provided user_id


        // Save the booking
        BookingTwoDTO newBooking = bookingTwoService.createBooking4(bookingTwo,preSeed_id,req);
        return ResponseEntity.ok(newBooking);
    }

    @GetMapping("/booking/incubator")
    public ResponseEntity<List<BookingTwoDTO>> getBookingsForIncubator(HttpServletRequest req) {
        return ResponseEntity.ok(bookingTwoService.getAllBookingsForIncubator(req));
    }

    @GetMapping("/booking/preseed")
    public ResponseEntity<List<BookingTwoDTO>> getBookingsForPreseed(HttpServletRequest req) {
        return ResponseEntity.ok(bookingTwoService.getAllBookingsForPreseed(req));
    }

}
