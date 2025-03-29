import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Auth0Provider} from "@auth0/auth0-react";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Token from "./Token.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import OnlineGame from "./OnlineGame.tsx";
import {StompSessionProvider} from "react-stomp-hooks";
import NewGame from "./NewGame.tsx";
 
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <StompSessionProvider url={"http://localhost:8080/ws"}>
            <Auth0Provider
                domain="dev-l5aemj1026u4dqia.us.auth0.com"
                clientId="3WDtuCDz2foYFJAHjKc2FxTTJmplDfL6"
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: "xiangqi-backend",
                }}
            >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path="/token" element={<Token/>}/>
                        <Route path="/game/new" element={<NewGame/>}/>
                        <Route path="/game/:id" element={<OnlineGame/>}/>
                    </Routes>
                </BrowserRouter>
            </Auth0Provider>
        </StompSessionProvider>
    </QueryClientProvider>
  </StrictMode>,
);
