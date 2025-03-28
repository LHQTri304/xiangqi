package com.se330.ctuong_backend.controller;

import com.se330.ctuong_backend.config.ApplicationConfiguration;
import com.se330.ctuong_backend.service.GameService;
import dto.request.Move;
import dto.response.Game;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class GameMovesController {
    private final SimpMessagingTemplate messagingTemplate;

    private final GameService gameService;

    @MessageMapping("/game/{gameId}")
    public Move move(@DestinationVariable Long gameId, @Payload Move move, Principal principal) {
        if (principal == null) {
            return null;
        }
        final Game game = gameService.getGameById(gameId);
        final var isWhite = game.getWhitePlayerId().trim().equals(principal.getName().trim());
        final String userGamePath = "/game/1";
        log.info("Move: {}", move);
        String userDestination = "/user/" + game.getBlackPlayerId() + userGamePath;
        log.info("Full User Destination: {}", userDestination);
        if (isWhite) {
            log.info("white moved");
            messagingTemplate.convertAndSendToUser(game.getBlackPlayerId(), userGamePath, move);
        } else {
            log.info("black moved");
            messagingTemplate.convertAndSendToUser(game.getWhitePlayerId(), userGamePath, move);
        }
        return move;
    }
}
