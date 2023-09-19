import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";

// import { Sidebar } from "./components/layout/sider/Sidebar";
import Sidebar from "./components/layout/sidebar/Sidebar";
import {
  LandingPage,
  Services,
  Bookings,
  Earnings,
  Profile,
  Community,
  About,
  Support,
  Feedback,
  Payments,
} from "./pages/index.js";

import "./App.css";

import {
  CreateService,
  EngageCall,
  TextQuery,
} from "../src/pages/services/createService/index.js";
import EditCallServiceForm from "./components/common/services_cards/EditCallServiceForm.js";
import UserServices from "./pages/services/user_services/UserServices.js";
import BookingService from "./pages/services/user_services/BookingService.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Dashboard from "./pages/dashboard/Dashboard.js";

import AccountPage from "./pages/profile/profile-pages/AccountPage.js";

import Availability from "./pages/calender/Availability.js";
import Navbar from "./components/layout/navbar/Navbar.js";

const App = () => {
  // const username = useSelector((state) => state.session.username);
  const [clickMenu, setClickMenu] = useState(false);
  const handleClickMenu = () => {
    setClickMenu(!clickMenu);
  };
  return (
    <main>
      <BrowserRouter>
        <Navbar handleClickMenu={handleClickMenu} />
        <Sidebar clickMenu={clickMenu} />
        {/* {true && <Sidebar />} */}
        <div className="sm:pl-64">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/availability" element={<Availability />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/account" element={<AccountPage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/feedback" element={<Feedback />} />

              <Route
                path="/services/create-service"
                element={<CreateService />}
              />

              <Route
                path="/services/create-service/engage-call"
                element={<EngageCall />}
              />
              <Route
                path="/services/create-service/text-query"
                element={<TextQuery />}
              />

              <Route
                path="/services/engage-call/edit-service/:id"
                element={<EditCallServiceForm />}
              />

              <Route path="/:username" element={<UserServices />} />
              <Route
                path="/:username/:title/:id/service"
                element={<BookingService />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
};

export default App;
