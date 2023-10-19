import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./components/layout/sidebar/Sidebar";
import {
  LandingPage,
  Services,
  Profile,
  About,
  Support,
  Feedback,
} from "./pages/index.js";

import "./App.css";

import ProtectedRoute from "./ProtectedRoute.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

import Availability from "./pages/calender/Availability.js";
import Navbar from "./components/layout/navbar/Navbar.js";
import ServiceHub from "./pages/servicehub/ServiceHub";
import NotFound from "./pages/NotFound";
import PublicPage from "./pages/public_page/PublicPage";
import Loader from "./components/helper/Loader";

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
      pathname === "/:username"
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
              <Route path="/public" element={<PublicPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/availability" element={<Availability />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/feedback" element={<Feedback />} />
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
