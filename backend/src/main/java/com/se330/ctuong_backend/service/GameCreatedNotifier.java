package com.se330.ctuong_backend.service;

import dto.response.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameCreatedNotifier {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void notify(Game game) {
        simpMessagingTemplate.convertAndSendToUser(game.getWhitePlayerId(), "/game/join", game);
        simpMessagingTemplate.convertAndSendToUser(game.getBlackPlayerId(), "/game/join", game);
    }
}
