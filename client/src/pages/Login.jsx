import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setUsername, setLoggedIn})  => {
    const [inputUsername, setInputUsername] = useState('');
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        if (inputUsername.trim()) {
            setUsername(inputUsername);
            setLoggedIn(true); 
            navigate('/chat');  // Redirect to chat with username
        } 
    };

return (
    <div className="text-center mt-32 md:mt-24 shadow-lg h-96 w-96 md:ml-[550px] rounded-lg">
      <h1 className="font-bold text-2xl text-[#48CAE4] mt-5">Login</h1>
    <div className="mt-10">
    <form onSubmit={handleLogin}
    className="flex flex-col items-center gap-5">
        <input
          className="h-9 w-72 border-2 p-1"
           type="text"
           placeholder="Enter your username"
           value={inputUsername}
           onChange={(e) => setInputUsername(e.target.value)}
           required
        />
        <input
        className="h-9 w-72 border-2 p-1" 
        type="password" 
        placeholder="Enter your password" 
        required 
        />
        <button
        className="bg-[#48CAE4] py-2 px-6 rounded-lg text-white mt-10" 
        type="submit">
            Login
        </button>
        </form>
      </div>
    </div>
  )
}

export default Login