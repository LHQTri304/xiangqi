package com.se330.ctuong_backend.controller;

import com.se330.ctuong_backend.service.GameService;
import com.se330.ctuong_backend.service.MatchMaker;
import dto.request.Move;
import dto.response.Game;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
@Slf4j
public class GameMovesController {
    private final SimpMessagingTemplate messagingTemplate;

    private final GameService gameService;
    private final MatchMaker matchMaker;

    @MessageMapping("/game/join")
    public void join(Principal principal) {
        if (principal == null) {
            return;
        }
        matchMaker.addToPlayerPool(principal.getName());
    }

    @MessageMapping("/game/{gameId}")
    @SendTo("/topic/game/{gameId}")
    public Move move(@DestinationVariable String gameId, @Payload Move move, Principal principal) {
        if (principal == null) {
            return null;
        }
        final Game game = gameService.getGameById(gameId);
        final var isWhite = game.getWhitePlayerId().trim().equals(principal.getName().trim());
        final String userGamePath = "/game/" + gameId;
        if (isWhite) {
            messagingTemplate.convertAndSendToUser(game.getBlackPlayerId(), userGamePath, move);
        } else {
            messagingTemplate.convertAndSendToUser(game.getWhitePlayerId(), userGamePath, move);
        }
        return move;
    }
}
