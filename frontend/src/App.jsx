import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import NavBar from "./components/navbar/NavBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import {useEffect, useState} from "react";
import CreateTask from "./components/createTask/CreateTask";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);

    return (
        <Router>
            <NavBar isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>
                <Route path="/tasks/new" element={isAuthenticated ? <CreateTask /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
