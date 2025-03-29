package dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class Game {
    private UUID gameId;
    private String blackPlayerId;
    private String whitePlayerId;
}
