import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Navbar } from "./components/layout/index.js";
import {
  Login,
  Dashboard,
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
import { loginAction, logoutAction } from "./redux/actions/Actions.js";
import { persistor } from "./redux/stores/Store.js";
import {
  CreateService,
  EngageCall,
  TextQuery,
} from "../src/pages/services/createService/index.js";
import EditCallServiceForm from "./components/common/services_cards/EditCallServiceForm.js";
import UserServices from "./pages/services/user_services/UserServices.js";
import BookingService from "./pages/services/user_services/BookingService.js";
import AccountPage from "./pages/profile/profile-pages/AccountPage.js";
import ForgetPassword from "./pages/login/forgetpassword/ForgetPassword.js";
import SignUp from "./pages/login/signup/SignUp.js";
import SignIn from "./pages/login/signin/SignIn.js";
import RecoverPassword from "./pages/login/forgetpassword/RecoverPassword.js";
import OTPPassword from "./pages/login/forgetpassword/OTPPasword.js";
import Availability from "./pages/calender/Availability.js";

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
      {username !== undefined ? (
        <Router>
          <Navbar username={username} />
          <Routes>
            <Route exact path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/profile/account" element={<AccountPage />} />
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
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/:username" element={<UserServices />} />
            <Route
              path="/:username/service/:title"
              element={<BookingService />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/otp" element={<OTPPassword />} />
            <Route path="/recover" element={<RecoverPassword />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
