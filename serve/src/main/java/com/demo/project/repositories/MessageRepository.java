package com.demo.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.project.models.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE (m.sender.id= ?1 and m.receiver.id=?2) or (m.sender.id= ?2 and m.receiver.id=?1) order by m.createdAt ASC ")
    List<Message> findBySenderAndReceiver(Long senderId, Long receiverId);
}
