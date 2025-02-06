package com.demo.project.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.demo.project.DTOS.MessageDTO;
import com.demo.project.models.Message;
import com.demo.project.models.User;
import com.demo.project.repositories.MessageRepository;
import com.demo.project.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public Message saveMessage(MessageDTO messageDTO) {
        User sender = userRepository.findById(messageDTO.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(messageDTO.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setMessage(messageDTO.getMessage());  // Ensure message content is set correctly
        // Print debug information to verify content before saving
        System.out.println("Saving message content: " + messageDTO.getMessage());

        return messageRepository.save(message);
    }

    public List<Message> getChatHistory(Long senderId, Long receiverId) {
        return messageRepository.findBySenderAndReceiver(senderId, receiverId);
    }

}
