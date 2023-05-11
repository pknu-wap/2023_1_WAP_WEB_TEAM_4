package com.project.glog.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.glog.domain.ChatMessage;
import com.project.glog.domain.ChatRoom;
import com.project.glog.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Component
public class WebsocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //요청으로 들어온 JSON 데이터를 객체로 변환해 반환한다.
        ChatMessage chatMessage = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        //메시지를 통해 채팅방의 Id를 알아내서 채팅방을 반환한다.
        ChatRoom chatRoom = chatService.findRoomById(chatMessage.getRoomId());

        //채팅방에 요청을 보낸 클라이언트의 정보와 메시지를 전송한다.
        chatRoom.handleActions(session, chatMessage, chatService);
    }
}