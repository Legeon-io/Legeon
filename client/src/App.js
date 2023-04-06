import React from "react";

import {
    Home,
    Bookings,
    Community,
    Engage,
    Profile,
} from "./pages";

const App = () => {
    return (
        <div>
            <h1>Legeon</h1>
            <Home />
            <Bookings />
            <Community />
            <Engage />
            <Profile />
        </div>
    )
}

export default App;