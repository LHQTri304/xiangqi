package com.se330.ctuong_backend.service;

import dto.response.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final Set<Game> games = ConcurrentHashMap.newKeySet();

    public void addGame(Game game) {
        games.add(game);
    }

    public Game getGameById(String gameId) {
        return games.stream()
                .filter(game -> game.getGameId().toString().equals(gameId))
                .findFirst()
                .orElseThrow();
    }
}
