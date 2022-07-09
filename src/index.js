import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./Resources/css/app.css";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
