import {useNavigate, useParams, useSearchParams} from "react-router";
import {Chessboard} from "react-xiangqiboard";
import {BoardOrientation} from "react-xiangqiboard/dist/chessboard/types";
import {useOnlineGame} from "./useOnlineGame";

export default function OnlineGame() {
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Validate player and game ID
    const player = searchParams.get("player") as BoardOrientation;
    if (!player || (player !== "white" && player !== "black")) {
        navigate("/");
        return null;
  }

    if (!id) {
        navigate("/");
        return null;
    }

    // Use the new custom hook
    const {game, onMove} = useOnlineGame(id);

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-20">
        <h1>{game.exportFen()}</h1>
      <div className="w-1/2 h-1/2">
          <Chessboard
              boardWidth={400}
              id="online-xiangqi-board"
              onPieceDrop={onMove}
              boardOrientation={player}
              position={game.exportFen()}
        />
      </div>
    </div>
  );
}
