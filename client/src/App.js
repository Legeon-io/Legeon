import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Navbar } from "./components/layout/index.js";
import { Login, Dashboard, Services, Bookings, Earnings, Profile, Community, About, Support, Feedback } from './pages/index.js';

import './App.css';
import { loginAction, logoutAction } from "./redux/actions/Actions.js";
import { persistor } from "./redux/stores/Store.js";
import { CreateService, EngageCall, TextQuery } from "../src/pages/services/createService/index.js";

const App = () => {
    const [sidebarVisible, setSidebar] = useState(false);

    const username = useSelector((state) => state.session.username);
    const dispatch = useDispatch();

    const handleLogin = (username) => {
        dispatch(loginAction({ username }));
    };

    const handleLogout = () => {
        dispatch(logoutAction());
        persistor.purge();
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <>
            {(username !== undefined) ? (
                <Router>
                    <Navbar sidebarVisible={sidebarVisible} setSidebar={setSidebar} handleLogout={handleLogout} username={username} />
                    <Routes>
                        <Route exact path="/" element={<Navigate to='/dashboard' />} />

                        <Route path="/dashboard" element={<Dashboard sidebarVisible={sidebarVisible} />} />
                        <Route path="/services" element={<Services sidebarVisible={sidebarVisible} />} />
                        <Route path="/bookings" element={<Bookings sidebarVisible={sidebarVisible} />} />
                        <Route path="/earnings" element={<Earnings sidebarVisible={sidebarVisible} />} />
                        <Route path="/profile" element={<Profile sidebarVisible={sidebarVisible} username={username}/>} />
                        <Route path="/community" element={<Community sidebarVisible={sidebarVisible} />} />
                        <Route path="/about" element={<About sidebarVisible={sidebarVisible} />} />
                        <Route path="/support" element={<Support sidebarVisible={sidebarVisible} />} />
                        <Route path="/feedback" element={<Feedback sidebarVisible={sidebarVisible} />} />

                        <Route path="/services/create-service" element={<CreateService sidebarVisible={sidebarVisible} username={username} />} />

                        <Route path="/services/create-service/engage-call" element={<EngageCall sidebarVisible={sidebarVisible} username={username} />} />
                        <Route path="/services/create-service/text-query" element={<TextQuery sidebarVisible={sidebarVisible} />} />
                    </Routes>
                </Router>
            ) : (
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Login handleLogin={handleLogin} />} />
                    </Routes>
                </Router>
            )
            }
        </>
    )
}

export default App;