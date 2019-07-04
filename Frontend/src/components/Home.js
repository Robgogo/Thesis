import React from "react";

import { Route } from "react-router-dom";

import TopNavBar from "./TopNavBar";
import Sidebar from "./Sidebar";

import Dashboard from "../pages/Dashboard";
import RecentData from "../pages/RecentData";
import Charts from "../pages/Charts";

import Datatable from "../pages/Datatable";

const Home = ({ match }) => {
  return (
    <div id="index-page">
      <TopNavBar />
      <div className="wrapper">
        <Sidebar />
        <main className="main-content">
          <Route path={`${match.path}Report`} component={Datatable} />
          <Route path={`${match.path}charts`} component={Charts} />
          <Route path={`${match.path}RecentData`} component={RecentData} />
          <Route exact path={`${match.path}`} component={Dashboard} />
        </main>
      </div>
    </div>
  );
};

export default Home;
