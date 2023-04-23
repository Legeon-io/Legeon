import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { Navbar } from "./components/layout/index.js";
import { Login, Dashboard, Engage, Bookings, Earnings, Profile, Community, About, Support, Feedback } from './pages/index.js';

import './App.css';

const App = () => {
    const [sidebarVisible, setSidebar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <>
            {isLoggedIn ? (
                <Router>
                    <Navbar sidebarVisible={sidebarVisible} setSidebar={setSidebar} handleLogout={handleLogout} />
                    <Routes>
                        <Route exact path="/" element={<Navigate to='/dashboard' />} />

                        <Route path="/dashboard" element={<Dashboard sidebarVisible={sidebarVisible} />} />
                        <Route path="/engage" element={<Engage sidebarVisible={sidebarVisible} />} />
                        <Route path="/bookings" element={<Bookings sidebarVisible={sidebarVisible} />} />
                        <Route path="/earnings" element={<Earnings sidebarVisible={sidebarVisible} />} />
                        <Route path="/profile" element={<Profile sidebarVisible={sidebarVisible} />} />
                        <Route path="/community" element={<Community sidebarVisible={sidebarVisible} />} />
                        <Route path="/about" element={<About sidebarVisible={sidebarVisible} />} />
                        <Route path="/support" element={<Support sidebarVisible={sidebarVisible} />} />
                        <Route path="/feedback" element={<Feedback sidebarVisible={sidebarVisible} />} />
                    </Routes>
                </Router>
            ) : (
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Login setLogin={handleLogin} />} />
                    </Routes>
                </Router>
            )
            }
        </>
    )
}

export default App;