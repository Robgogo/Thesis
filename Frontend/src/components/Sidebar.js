import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="main-sidebar">
      <section className="user-container">
        <span>river</span>
      </section>
      <ul className="side-nav-container">
        <li className="header">
          <p>MAIN NAVIGATION</p>
        </li>
        <li className="active">
          <Link to="/">
            <i className="fas fa-chart-bar" />
            <span className="info-txt">Dashbaord</span>
          </Link>
        </li>
        <li>
          <Link to="/RecentData">
            <i className="fab fa-wpforms" />
            <span className="info-txt">Recent Result</span>
          </Link>
        </li>
        <li>
          <Link to="/Report">
            <i className="fas fa-table" />
            <span className="info-txt">Report</span>
          </Link>
        </li>
        <li>
          <Link to="/charts">
            <i className="fas fa-chart-area" />
            <span className="info-txt">Charts</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
