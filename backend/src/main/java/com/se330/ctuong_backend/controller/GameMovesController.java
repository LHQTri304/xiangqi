package com.se330.ctuong_backend.controller;

import dto.request.Move;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GameMovesController {
    @MessageMapping("/game/move")
    @SendTo("/topic/game/move")
    public Move move(@Payload Move move) {
        return move;
    }
}
