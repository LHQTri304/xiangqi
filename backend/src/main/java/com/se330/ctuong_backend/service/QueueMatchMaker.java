package com.se330.ctuong_backend.service;

import com.se330.ctuong_backend.config.ApplicationConfiguration;
import dto.response.Game;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Service
public class QueueMatchMaker implements MatchMaker {
    private final List<String> queue = Collections.synchronizedList(new LinkedList<>());

    @Override
    public Game getGame(String username) {
        return ApplicationConfiguration.DEFAULT_GAME;
    }
}
