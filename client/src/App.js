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
          <Navbar
            sidebarVisible={sidebarVisible}
            setSidebar={setSidebar}
            handleLogout={handleLogout}
            username={username}
          />
          <Routes>
            <Route exact path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/profile/account" element={<AccountPage />} />
            <Route
              path="/dashboard"
              element={<Dashboard sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/services"
              element={<Services sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/bookings"
              element={<Bookings sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/payments"
              element={<Payments sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/earnings"
              element={<Earnings sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/profile"
              element={<Profile sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/community"
              element={<Community sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/about"
              element={<About sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/support"
              element={<Support sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/feedback"
              element={<Feedback sidebarVisible={sidebarVisible} />}
            />

            <Route
              path="/services/create-service"
              element={<CreateService sidebarVisible={sidebarVisible} />}
            />

            <Route
              path="/services/create-service/engage-call"
              element={<EngageCall sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/services/create-service/text-query"
              element={<TextQuery sidebarVisible={sidebarVisible} />}
            />

            <Route
              path="/services/engage-call/edit-service/:id"
              element={<EditCallServiceForm />}
            />

            <Route
              path="/:username"
              element={<UserServices sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/:username/:title/:id/service"
              element={<BookingService sidebarVisible={sidebarVisible} />}
            />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/:username"
              element={<UserServices sidebarVisible={sidebarVisible} />}
            />
            <Route
              path="/:username/service/:title"
              element={<BookingService sidebarVisible={sidebarVisible} />}
            />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
