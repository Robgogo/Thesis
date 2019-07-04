import React, { Component } from "react";

//
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";
import LineChart from "../components/charts/LineChart";
import StackedChart from "../components/charts/StackedChart";

class Charts extends Component {
  constructor() {
    super();

    let data = [
      [100, 150, 80, 200, 250, 80, 300],
      [60, 100, 100, 150, 200, 150, 100]
    ];
    this.state = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      data: data,
      flowRate: this.flowRate(data),
      flowRateLebels: ["month", "speed"]
    };
  }

  flowRate(data) {
    let income, expense;
    income = data[0].reduce(function(total, num) {
      return total + parseFloat(num);
    }, 0);

    expense = data[1].reduce(function(total, num) {
      return total + parseFloat(num);
    }, 0);

    return [income, expense];
  }

  render() {
    const { labels, data } = this.state;
    return (
      <div className="charts">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading-container">
                <div className="header-title">
                  <h1>Charts</h1>
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <LineChart labels={labels} data={data} />

            <StackedChart labels={labels} data={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
