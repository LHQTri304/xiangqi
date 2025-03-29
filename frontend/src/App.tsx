import { Chessboard } from "react-xiangqiboard";
import { Button } from "./components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import NewGame from "./NewGame";

function App() {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const login = async () => {
    await loginWithRedirect();
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        localStorage.setItem("access_token", token);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-20">
      <div className="flex justify-center items-center w-full h-full">
        {!isAuthenticated ? (
          <Button onClick={login}>Login</Button>
        ) : (
          <div className="flex flex-col">
            <h1>Welcome, {user!.name}</h1>
            <h2>Email: {user!.email}</h2>
            <h2>Sub: {user!.sub}</h2>
            <div className="flex gap-5 w-full flew-row">
              <NewGame className="w-1/2" />
              <Button
                onClick={() => logout()}
                variant="destructive"
                className="w-1/2"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 items-center w-full h-full">
        <div className="w-1/2 h-1/2">
          <Chessboard id="whut" />
        </div>
      </div>
    </div>
  );
}

export default App;
