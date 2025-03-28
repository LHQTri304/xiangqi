package com.se330.ctuong_backend.controller;

import dto.response.NewGameResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
    @PostMapping("/game/new")
    public NewGameResponse newGame() {
        return NewGameResponse.builder()
                .gameId(1)
                .side("white")
                .build();
    }
}
