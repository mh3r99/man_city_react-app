import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./Hoc/Layout";

const Routes = (props) => {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
        </Switch>
      </Layout>
    </>
  );
};

export default Routes;
