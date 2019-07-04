import React, { Component } from "react";

import Chartist from "chartist";
require("chartist-plugin-tooltips");
require("chartist-plugin-axistitle");

class BarChart extends Component {
  createBarChart() {
    if (!document.getElementById("incomeExpenseLineChart")) {
      return false;
    }

    let options, _responsiveOptions;

    _responsiveOptions = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              //return value[0];
              return value.substring(0, 3).toUpperCase();
            }
          }
        }
      ]
    ];

    let { labels, data, height } = this.props;
    data = {
      labels: labels,
      series: data
    };

    options = {
      seriesBarDistance: 10,
      plugins: [
        Chartist.plugins.tooltip({
          currency: "$ ",
          appendToBody: true
        }),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "Date (months)",
            offset: {
              x: 0,
              y: 50
            }
          },
          axisY: {
            axisTitle: "Income & Expense",
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: -1
            },
            flipTitle: false
          }
        })
      ]
    };
    if (height) {
      options.height = height;
    }
    new Chartist.Bar("#bar-chart", data, options, _responsiveOptions);
  }
  componentDidMount() {
    this.createBarChart();
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <div className="card card-box card-success">
          <div className="card-body chart-container">
            <div id="bar-chart" />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;
