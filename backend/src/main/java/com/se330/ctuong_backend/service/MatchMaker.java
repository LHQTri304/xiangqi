package com.se330.ctuong_backend.service;

import dto.response.Game;

public interface MatchMaker {
    Game getGame(String username);
}
