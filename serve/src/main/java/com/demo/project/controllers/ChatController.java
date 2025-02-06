package com.demo.project.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.project.DTOS.MessageDTO;
import com.demo.project.models.Message;
import com.demo.project.services.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/any")
public class ChatController {
    private final MessageService messageService;
    

   


    @PostMapping("/send/{receiverId}/{senderId}")
    public Message sendMessageAPI(@RequestBody MessageDTO messageDTO,
                                  @PathVariable Long receiverId,
                                  @PathVariable Long senderId) {
        messageDTO.setSenderId(senderId);
        messageDTO.setReceiverId(receiverId);
        return messageService.saveMessage(messageDTO);
    }

    @GetMapping("/get/my/History/{receiverId}/{senderId}")
    public List<Message> getMyHistory(@PathVariable Long receiverId,
                                      @PathVariable Long senderId) {
        return messageService.getChatHistory(senderId, receiverId);
    }
}
