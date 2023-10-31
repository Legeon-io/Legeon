import React, { useEffect, useState } from "react";
import {
  // BrowserRouter,
  Route,
  Routes,
  // Navigate,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/layout/sidebar/Sidebar";
import {
  LandingPage,
  Services,
  // Bookings,
  // Earnings,
  Profile,
  // Community,
  About,
  Support,
  Feedback,
  // Payments,
} from "./pages/index.js";

import "./App.css";

import {
  CreateService,
  // EngageCall,
  // TextQuery,
} from "../src/pages/services/createService/index.js";
// import EditCallServiceForm from "./components/common/services_cards/EditCallServiceForm.js";
// import UserServices from "./pages/services/user_services/UserServices.js";
// import BookingService from "./pages/services/user_services/BookingService.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

import Availability from "./pages/calender/Availability.js";
import Navbar from "./components/layout/navbar/Navbar.js";
import ServiceHub from "./pages/servicehub/ServiceHub";
import NotFound from "./pages/NotFound";
import PublicPage from "./pages/public_page/PublicPage";
import Loader from "./components/helper/Loader";
import CalenderBooking from "./pages/calenderBooking/CalenderBooking";
import CreateServices from "./pages/services/createServices";

const App = () => {
  console.log(process.env.REACT_APP_API_URL);
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
      pathname === "/:username" ||
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
              <Route path="/public" element={<PublicPage />} />
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
                {/* <Route path="/bookings" element={<Bookings />} /> */}
                {/* <Route path="/payments" element={<Payments />} /> */}
                {/* <Route path="/earnings" element={<Earnings />} /> */}
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/account" element={<AccountPage />} /> */}
                {/* <Route path="/community" element={<Community />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route
                  path="/services/create_service"
                  element={<CreateService />}
                />
                {/* <Route path="/services/create-service/engage-call" element={<EngageCall />} /> */}
                {/* <Route path="/services/create-service/text-query" element={<TextQuery />} /> */}
                {/* <Route path="/services/engage-call/edit-service/:id" element={<EditCallServiceForm />} /> */}
                {/* <Route path="/:username" element={<UserServices />} /> */}
                {/* <Route path="/:username/:title/:id/service" element={<BookingService />} /> */}
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
