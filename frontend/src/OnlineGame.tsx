import { useEffect, useState } from "react";
import {
  StompSessionProvider,
  useStompClient,
  useSubscription,
} from "react-stomp-hooks";
import { Chessboard } from "react-xiangqiboard";
import Xiangqi from "./xiangqi";
import { useAuth0 } from "@auth0/auth0-react";

type Move = {
  from: string;
  to: string;
};

function Game() {
  const { user } = useAuth0();
  const stompClient = useStompClient();

  function noMove(from: string, to: string) {
    console.log(from, to);
  }

  const [onMove, setOnMove] = useState(() => noMove);
  const [game, setGame] = useState(new Xiangqi());

  function sendMove(from: string, to: string, _piece: string): boolean {
    if (!stompClient) {
      console.log("No stomp client");
      return false;
    }
    const gameCopy: Xiangqi = Object.create(game) as Xiangqi;
    const move = gameCopy.move({
      from: from,
      to: to,
    });
    setGame(gameCopy);
    console.log("Move", {
      from: from,
      to: to,
    });

    // illegal move
    if (!move) return false;

    stompClient.publish({
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      destination: "/app/game/1",
      body: JSON.stringify({ from, to }),
    });

    return true;
  }

  useSubscription(
    `/user/${user?.sub}/game/1`,
    (message) => {
      const { from, to } = JSON.parse(message.body) as Move;
      if (!stompClient) {
        console.log("No stomp client");
        return false;
      }
      const gameCopy: Xiangqi = Object.create(game) as Xiangqi;
      const move = gameCopy.move({
        from: from,
        to: to,
      });
      setGame(gameCopy);
      console.log("Move", {
        from: from,
        to: to,
      });

      // illegal move
      if (!move) return false;

      stompClient.publish({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        destination: "/app/game/1",
        body: JSON.stringify({ from, to }),
      });

      return true;
    },
    {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  );

  useEffect(() => {
    if (!stompClient) {
      console.log("No stomp client");
      return;
    }
    console.log("YEHH");
    setOnMove(() => sendMove);
  }, [stompClient]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-20">
      <div className="w-1/2 h-1/2">
        <Chessboard
          boardWidth={400}
          id="yeye"
          onPieceDrop={sendMove}
          boardOrientation={user?.sub?.indexOf("auth0") === -1 ? "white" : "black"}
          position={game.exportFen()}
        />
        ,
      </div>
    </div>
  );
}

function OnlineGame() {
  return (
    <>
      {" "}
      <StompSessionProvider url={"http://localhost:8080/ws"}>
        <Game />
      </StompSessionProvider>
    </>
  );
}

export default OnlineGame;
