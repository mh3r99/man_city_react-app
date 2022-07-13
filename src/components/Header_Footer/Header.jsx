import { AppBar, Button, Toolbar } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import CityLogo from "../ui/CityLogo";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onLogout = () => {
    auth.signOut();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#98c5e9",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e",
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <CityLogo link linkTo="/" width="70px" height="70px" />
            </div>
          </div>

          <Link to="/the_team">
            <Button color="inherit">The team</Button>
          </Link>
          <Link to="/the_matches">
            <Button color="inherit">Matches</Button>
          </Link>
          {loggedIn ? (
            <>
              <Link to="/dashboard">
                <Button color="inherit">Dashboard</Button>
              </Link>

              <Button color="inherit" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
