import { Component } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../services/chat.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
  selector: 'app-chat',
  imports: [RouterModule, FormsModule, CommonModule,HomeNavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  senderId: number = 0;
  receiverId: number = 0;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private messageService: MessageService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.senderId = Number(localStorage.getItem('userId'));

    this.route.paramMap.subscribe(params => {
      this.receiverId = Number(params.get('receiverId'));
      console.log('Sender ID:', this.senderId);
      console.log('Receiver ID:', this.receiverId);

      this.connectToWebSocket();
      this.loadChat();
    });

    this.messageService.messages$.subscribe((message) => {
      console.log('Received message in component:', message);
      if (message && (message.sender.id === this.receiverId || message.receiver.id === this.senderId)) {
        this.messages.push(message);
      }
    });
  }

  connectToWebSocket(): void {
    this.messageService.connect(this.senderId);
    this.messageService.connect(this.receiverId);
  }

  loadChat(): void {
    this.messageService.getChat(this.senderId, this.receiverId).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.messages = data;
          console.log('Chat loaded:', this.messages);
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error loading chat:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      console.log('Sending message:', this.newMessage);
  
      const message: Message = {
        sender: { id: this.senderId },
        receiver: { id: this.receiverId },
        message: this.newMessage
      };
      this.messageService.sendMessageWebSocket(this.senderId, this.receiverId, this.newMessage);
  
      this.messages.push(message);
      this.newMessage = '';
    }
  }
}
