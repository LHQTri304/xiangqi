package dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Game {
    private Long gameId;
    private String blackPlayerId;
    private String whitePlayerId;
}
