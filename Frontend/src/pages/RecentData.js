import React, { Component } from "react";

import Datatable from "./Datatable";

class RecentData extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {}

  render() {
    return (
      <div id="RecentData">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading-container">
                <div className="header-title">
                  <h1>Flow Rate and Water Level</h1>
                </div>
              </div>
            </div>

            <Datatable />

            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default RecentData;
