import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Eventpage from "./pages/Events";
import Bookingpage from "./pages/Bookings";

import MainNavigation from "./components/Navigation/MainNavigation";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={Eventpage} />
            <Route path="/bookings" component={Bookingpage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
