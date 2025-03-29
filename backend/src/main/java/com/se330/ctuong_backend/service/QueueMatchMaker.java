package com.se330.ctuong_backend.service;

import com.se330.ctuong_backend.util.UniqueQueue;
import dto.response.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QueueMatchMaker implements MatchMaker {
    private static final UniqueQueue<String> queue = new UniqueQueue<>();

    private final GameCreatedNotifier gameCreatedNotifier;
    private final GameService gameService;
    private final Random random;

    @Scheduled(fixedDelay = 1000)
    protected void scheduleFixedDelayTask() {
        if (queue.size() < 2) {
            return;
        }
        final var gameBuilder = Game.builder()
                .gameId(UUID.randomUUID());
        final var playerA = queue.dequeue();
        final var playerB = queue.dequeue();
        if (random.nextBoolean()) {
            gameBuilder.whitePlayerId(playerA)
                    .blackPlayerId(playerB);
        } else {
            gameBuilder.whitePlayerId(playerB)
                    .blackPlayerId(playerA);
        }
        final var game = gameBuilder.build();
        gameCreatedNotifier.notify(game);
        gameService.addGame(game);
    }


    @Override
    public void addToPlayerPool(String username) {
        queue.enqueue(username);
    }
}
