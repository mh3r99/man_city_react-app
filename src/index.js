import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./Resources/css/app.css";

const App = () => {
  return <Routes />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
