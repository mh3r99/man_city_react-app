import React from "react";
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Header_Footer/Footer";
import Header from "./components/Header_Footer/Header";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./components/SignIn/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Admin/Dashboard";
import Players from "./components/Admin/Players/Players";
import AddEditPlayers from "./components/Admin/Players/AddEditPlayers";
import TheTeam from "./components/TheTeam/TheTeam";
import Matches from "./components/Admin/Matches/Matches";
import AddEditMatches from "./components/Admin/Matches/AddEditMatches";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/the_team" element={<TheTeam />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/admin_players" element={<PrivateRoute />}>
            <Route path="/admin_players" element={<Players />} />
            <Route
              path="/admin_players/add_player"
              element={<AddEditPlayers />}
            />
            <Route
              path="/admin_players/edit_player/:playerid"
              element={<AddEditPlayers />}
            />
          </Route>
          <Route path="/admin_matches" element={<PrivateRoute />}>
            <Route path="/admin_matches" element={<Matches />} />
            <Route
              path="/admin_matches/add_match"
              element={<AddEditMatches />}
            />
            <Route
              path="/admin_matches/edit_match/:matchid"
              element={<AddEditMatches />}
            />
          </Route>
        </Switch>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
