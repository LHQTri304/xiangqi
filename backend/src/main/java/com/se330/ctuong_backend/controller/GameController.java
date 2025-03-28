package com.se330.ctuong_backend.controller;

import com.se330.ctuong_backend.service.MatchMaker;
import dto.response.Game;
import dto.response.NewGameResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class GameController {
    private final MatchMaker matchMaker;

    @PostMapping("/game/new")
    public Game newGame(Principal principal) {
        return matchMaker.getGame(principal.getName());
    }
}
