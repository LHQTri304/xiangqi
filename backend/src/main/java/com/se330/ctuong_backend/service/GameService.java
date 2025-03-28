package com.se330.ctuong_backend.service;

import com.se330.ctuong_backend.config.ApplicationConfiguration;
import dto.response.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {
    public Game getGameById(Long gameId) {
        // TODO: get game from database
        return ApplicationConfiguration.DEFAULT_GAME;
    }
}
