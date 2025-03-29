import {useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useStompClient, useSubscription} from "react-stomp-hooks";

type Game = {
    gameId: string;
    whitePlayerId: string;
    blackPlayerId: string;
};

export default function NewGame() {
    const {user} = useAuth0();
    const stompClient = useStompClient();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useSubscription(`/user/${user?.sub}/game/join`, (message) => {
        const game = JSON.parse(message.body) as Game;
        let player = "white";
        if (game.whitePlayerId === user?.sub) {
            player = "black";
        }
        navigate(`/game/${game.gameId}?player=${player}`);
    });

    if (!user) {
        return <div>Not logged in yet</div>;
    }

    function createGame() {
        if (!stompClient) {
            console.log("No stomp client");
            return;
        }
        stompClient.publish({
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            destination: "/app/game/join",
            body: JSON.stringify({}),
        });
        setLoading(true);
    }

    if (loading) {
        return <div>Creating game, please wait...</div>;
    }

    return <button onClick={createGame}>Create game</button>;
}
