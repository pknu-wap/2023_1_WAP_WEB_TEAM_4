package com.project.glog.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class ChatConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //STOMP프로토콜을 사용하는 WebSocket 엔드포인트를 등록한다.
        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*").withSockJS();

        //.setAllowedOriginPatterns("*")는 모든 원본(origin)에서의 접근을 허용한다는 의미입니다.
        // 즉, 어떤 도메인에서도 해당 WebSocket 엔드포인트에 접근할 수 있습니다.
        // 이는 CORS (Cross-Origin Resource Sharing) 정책을 우회하기 위한 설정입니다.

        //.withSockJS()는 SockJS를 사용하여 WebSocket을 지원하도록 설정합니다.
        //SockJS는 WebSocket을 지원하지 않는 브라우저에서도 대체 기술로 폴백(fallback)할 수 있도록 합니다.
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        //브로커가 클라이언트에게 메시지를 전달하는 경로 등록
        registry.enableSimpleBroker("/queue", "/topic");

        //클라이언트가 메시지를 보낼 때 사용할 애플리케이션 전용 접두사(prefix)를 설정
        //예를 들어, 클라이언트가 "/app/chat"으로 메시지를 보내면 해당 메시지는 "/chat" 경로로 처리됩니다.
        registry.setApplicationDestinationPrefixes("/app");
    }
}