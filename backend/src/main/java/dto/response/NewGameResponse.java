package dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewGameResponse {
    private int gameId;
    private String side; // white or black
}
