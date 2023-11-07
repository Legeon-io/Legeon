import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/layout/sidebar/Sidebar";
import { LandingPage, Services, Profile } from "./pages/index.js";

import "./App.css";

import ProtectedRoute from "./ProtectedRoute.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

import Availability from "./pages/calender/Availability.js";
import Navbar from "./components/layout/navbar/Navbar.js";
import ServiceHub from "./pages/service_hub/ServiceHub.js";
import NotFound from "./pages/NotFound";
import Loader from "./components/helper/Loader";
import CalenderBooking from "./pages/calenderBooking/CalenderBooking";
import CreateServices from "./pages/services/createServices";

const App = () => {
  const [clickMenu, setClickMenu] = useState(false);
  const handleClickMenu = () => {
    setClickMenu(!clickMenu);
  };

  const [showSidebar, setSidebar] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const { pathname } = location;
    if (
      pathname === "/" ||
      pathname === "/404" ||
      pathname === "/public" ||
      // username ||
      pathname === "/calenderBooking"
    ) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, [location.pathname]);

  const [startAnimationLoading, setStartAnimationLoading] = useState(true);
  const [msg, setMsg] = useState("Welcome to Legeon");

  useEffect(() => {
    setTimeout(() => {
      setStartAnimationLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {startAnimationLoading ? (
        <div className="flex flex-col gap-10 justify-center items-center h-screen w-full bg-black text-white">
          <Loader />
          <div className="text-3xl">{msg}</div>
        </div>
      ) : (
        <>
          <Navbar handleClickMenu={handleClickMenu} />
          {showSidebar && <Sidebar clickMenu={clickMenu} />}
          <div className={`${showSidebar ? "sm:pl-64" : ""}`}>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/calenderBooking" element={<CalenderBooking />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/availability" element={<Availability />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/createServices"
                  element={<CreateServices />}
                />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/:username" element={<ServiceHub />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App;
