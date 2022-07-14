import { AppBar, Button, Toolbar } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import CityLogo from "../ui/CityLogo";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { loggedIn, checkingStatus } = useAuthStatus();

  const onLogout = () => {
    auth.signOut();
    toast.success("Good bye!!");
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
