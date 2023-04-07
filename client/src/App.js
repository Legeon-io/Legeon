import React from "react";

import Navbar from "./components/layout/navbar/Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import {Home, Engage, Bookings, Earnings, Profile, Community, About, Support, Feedback} from './pages';

const App = () => {
    return (
        <>
        <Router>
            <Navbar />
            <Routes>
            <Route path="/" Component={ Home }/>
                <Route path="/engage" Component={ Engage }/>
                <Route path="/bookings" Component={ Bookings }/>
                <Route path="/earnings" Component={ Earnings }/>
                <Route path="/profile" Component={ Profile }/>
                <Route path="/community" Component={ Community }/>
                <Route path="/about" Component={ About }/>
                <Route path="/support" Component={ Support }/>
                <Route path="/feedback" Component={ Feedback }/>
            </Routes>
        </Router>
        </>
    )
}

export default App;