import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Navbar } from "./components/layout/index.js";
import {
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
import ForgetPassword from "./pages/login/forgetpassword/ForgetPassword.js";
import SignUp from "./pages/login/signup/SignUp.js";
import SignIn from "./pages/login/signin/SignIn.js";
import RecoverPassword from "./pages/login/forgetpassword/RecoverPassword.js";
import OTPPassword from "./pages/login/forgetpassword/OTPPasword.js";

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

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/bookings",
      element: <Bookings />,
    },
    {
      path: "/payments",
      element: <Payments />,
    },
    {
      path: "/earnings",
      element: <Earnings />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/community",
      element: <Community />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/feedback",
      element: <Feedback />,
    },
    {
      path: "/services/create-service",
      element: <CreateService />,
    },
    {
      path: "/services/create-service/engage-call",
      element: <EngageCall />,
    },
    {
      path: "/services/create-service/text-query",
      element: <TextQuery />,
    },
    {
      path: "/services/engage-call/edit-service/:id",
      element: <EditCallServiceForm />,
    },
    {
      path: "/:username",
      element: <UserServices />,
    },
    {
      path: "/:username/:title/:id/service",
      element: <BookingService />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/forgetpassword",
      element: <ForgetPassword />,
    },
    {
      path: "/otp",
      element: <OTPPassword />,
    },
    {
      path: "/recover",
      element: <RecoverPassword />,
    },
    {
      path: "/:username/service/:title",
      element: <BookingService />,
    },
  ]);

  return (
    <main>
      {username && <Navbar />}
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
