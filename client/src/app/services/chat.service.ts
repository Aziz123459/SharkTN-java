import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Message } from "../message";
import { HttpClient } from "@angular/common/http";
import { Client, Message as StompMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
    private apiUrl = 'http://localhost:8080/api/v1/any';
    private stompClient: Client | null = null;
  private messagesSubject = new Subject<Message>();
  messages$ = this.messagesSubject.asObservable();
    constructor(private http: HttpClient) {}
    sendMessage(senderId: number, receiverId: number, message: any): Observable<Message> {
        return this.http.post<Message>(`${this.apiUrl}/send/${receiverId}/${senderId}`, message);
      }
    
      getChat(senderId: number, receiverId: number): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.apiUrl}/get/my/History/${receiverId}/${senderId}`);
      }
      connect(userId: number): void {
        try {
          const socket = new SockJS('http://localhost:8080/api/chat');
          this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (msg) => console.log(msg), // Log all debug messages
            reconnectDelay: 5000,
          });
      
          this.stompClient.onConnect = (frame) => {
            console.log('✅ Connected to WebSocket', frame);
      
            // Check the subscription
            const subscription = this.stompClient?.subscribe(`/topic/messages/${userId}`, (message: StompMessage) => {
              console.log('📩 Received message:', message.body);  // Log message body
              const newMessage: Message = JSON.parse(message.body);
              console.log('📩 Parsed message:', newMessage);  // Log parsed message
              this.messagesSubject.next(newMessage);
            });
      
            console.log(`📡 Subscribed to /topic/messages/${userId}`, subscription);
          };
      
          this.stompClient.onStompError = (frame) => {
            console.error('❌ WebSocket Error:', frame);
          };
      
          this.stompClient.activate();
        } catch (error) {
          console.error('❌ WebSocket connection error:', error);
        }
      }
      
    
      sendMessageWebSocket(senderId: number, receiverId: number, content: string): void {
        if (this.stompClient && this.stompClient.connected) {
          const messageData = { senderId, receiverId, message: content, timestamp: new Date() };
          this.stompClient.publish({
            destination: `/app/sendMessage`,
            body: JSON.stringify(messageData),
          });
          console.log('Sent message:', messageData);  // Log sent messages
        } else {
          console.error('WebSocket is not connected');
          // Retry connecting to WebSocket
          this.connect(senderId);
        }
      }
    
  }
