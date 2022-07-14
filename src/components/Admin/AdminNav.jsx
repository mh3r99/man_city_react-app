import { ListItem } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const AdminNav = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const links = [
    { title: "Matches", linkTo: "/admin_matches" },
    { title: "Players", linkTo: "/admin_players" },
  ];

  const onLogout = () => {
    auth.signOut();
    toast.success("Good bye!!");
    navigate("/");
  };

  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));

  return (
    <div>
      {renderItems()}
      <ListItem button className="admin_nav_link" onClick={onLogout}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
