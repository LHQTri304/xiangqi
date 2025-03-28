package dto.request;

import lombok.Data;

@Data
public class Move {
    private String from;
    private String to;
    private Long gameId;
}
