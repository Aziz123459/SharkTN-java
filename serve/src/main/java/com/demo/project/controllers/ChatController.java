package com.demo.project.controllers;

import java.util.List;

import com.demo.project.DTOS.MessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.demo.project.models.Message;
import com.demo.project.services.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/any")
public class ChatController {
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(MessageDTO messageDTO) {
        try {
            System.out.println("✅ Received message content: " + messageDTO.getMessage());

            Message savedMessage = messageService.saveMessage(messageDTO);

            String senderDestination = "/topic/messages/" + messageDTO.getSenderId();
            String receiverDestination = "/topic/messages/" + messageDTO.getReceiverId();

            System.out.println("📤 Sending message to: " + senderDestination);
            System.out.println("📤 Sending message to: " + receiverDestination);

            messagingTemplate.convertAndSend(senderDestination, savedMessage);  // Sending to sender
            messagingTemplate.convertAndSend(receiverDestination, savedMessage);  // Sending to receiver
        } catch (Exception e) {
            System.err.println("Error handling message: " + e.getMessage());
            e.printStackTrace();
        }
    }




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
