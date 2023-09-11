import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Sidebar } from "./components/layout/index.js";
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

import Availability from "./pages/calender/Availability.js";
import Navbar from "./components/layout/navbar/Navbar.js";

const App = () => {
  // const username = useSelector((state) => state.session.username);

  return (
    <main>
      {/* <Sidebar /> */}
      {false && <Sidebar />}
      <Navbar />
      {/* <div className="sm:pl-64"> */}
      <BrowserRouter>
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
      </BrowserRouter>
      {/* </div> */}
    </main>
  );
};

export default App;
