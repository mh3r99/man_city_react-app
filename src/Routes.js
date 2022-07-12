import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Layout from "./Hoc/Layout";

const Routes = (props) => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Switch>
      </Layout>
    </>
  );
};

export default Routes;
