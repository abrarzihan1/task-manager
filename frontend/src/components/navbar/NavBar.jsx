import './NavBar.css'
import {useNavigate} from "react-router-dom";

const NavBar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="app-name">\\TaskManager</div>
            {isAuthenticated ? (
                <button className="login-logout-button" onClick={handleLogout}>Logout</button>
            ) :
                <button className="login-logout-button" onClick={() => {navigate("/login")} }>
                    Login
                </button>
            }
        </nav>
    );
};

export default NavBar;