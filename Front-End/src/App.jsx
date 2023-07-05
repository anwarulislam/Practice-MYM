import { useState } from "react";
import Login from "./pages/login";
import "./App.css";
import Nasa from "./pages/nasa";

function App() {
  const [user, setUser] = useState(null);

  const setUserSession = (user) => {
    setUser(user);
  };

  return <>{user ? <Nasa/> : <Login setUser={setUserSession} />}</>;
}

export default App;
