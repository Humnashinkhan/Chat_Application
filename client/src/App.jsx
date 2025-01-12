import {Routes, Route, Navigate} from "react-router-dom"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import NavBar from "./components/NavBar"
import { useState } from "react";
function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setUsername('');  // Clear the username
    setLoggedIn(false);  // Set loggedIn to false
};


  return (
    <> 
    <NavBar username={username} loggedIn={loggedIn} onLogout={handleLogout} />
    <Routes>
      <Route path="/chat" element = {<Chat username={username} />} />
      <Route path="/" element = {<Login setUsername={setUsername} setLoggedIn={setLoggedIn} />} />
      <Route path="/" element = {<Navigate to="/"/>} />

    </Routes>
     </>
  )
}

export default App
