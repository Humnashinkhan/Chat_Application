import {Link, useNavigate} from "react-router-dom"
const NavBar = ({ username, loggedIn, onLogout  }) => {
     const navigate = useNavigate()

     const handleLogout = () => {
        onLogout();  // Call the logout function passed via props
        navigate('/');  // Redirect to login page
    };
  return (
    <div className="w-screen md:w-full md:h-12 bg-[#48CAE4] fixed top-0 left-0 z-50 shadow-lg">
        <div className="flex justify-between">
        <h2 className="font-semibold text-white py-2 ml-2 md:ml-24 text-lg cursor-pointer">
        <Link to ="/">My ChattApp</Link>  
        </h2>
        <span 
        className="text-white py-2 text-lg font-semibold cursor-pointer">
            {username ? `Logged in as ${username}` : 'Not logged in'}
        </span>
        <div>
        {loggedIn ? (
            <button className="text-white py-2 text-lg md:font-semibold mr-5 md:mr-24"
            onClick={handleLogout}
            >
             Logout
            </button>
            ) : (
                <button className="text-white py-2 text-lg font-semibold mr-5 md:mr-24">
                <Link to="/">Login</Link>
            </button>
        )}  
        </div>
        </div>
    </div>
  )
}

export default NavBar