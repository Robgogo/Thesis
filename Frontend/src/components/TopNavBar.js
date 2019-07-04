import React, { Component } from "react";
import mainLogo from "../images/log-0.png";

import SmartUtils from "../Utils";

class TopNavBar extends Component {
  constructor() {
    super();
    this.openNav = this.openNav.bind(this);
    this.toggleMinimize = this.toggleMinimize.bind(this);
  }

  openNav(e) {
    e.preventDefault();
    SmartUtils.classToggler(document.body, "nav-open");
    SmartUtils.classToggler(document.querySelector(".wrapper-menu"), "open");
  }

  toggleMinimize(e) {
    e.preventDefault();
    SmartUtils.classToggler(document.body, "minimize");
  }

  render() {
    return (
      <header className="top-navigation">
        <div className="logo-container">
          <img className="lg-logo" src={mainLogo} alt="Smart Admin" />
          <span className="sm-logo">RBM</span>
        </div>
        <nav className="top-navbar">
          <span className="toggle-container" onClick={this.toggleMinimize}>
            <i className="fas fa-bars" />
          </span>

          <div className="menu-open-container">
            <div className="wrapper-menu" onClick={this.openNav}>
              <div className="line-menu half start" />
              <div className="line-menu" />
              <div className="line-menu half end" />
            </div>
          </div>
          {/* <!-- User Profile --> */}
          <ul className="header-nav">
            <li className="user-info">
              <div className="dropdown">
                <a
                  className="dropdown-toggle user-c"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>IoT Based River Basin Monitoring System</span>
                </a>
              </div>
            </li>
          </ul>
          {/* <!-- User Profile -->  */}
        </nav>
      </header>
    );
  }
}

export default TopNavBar;
