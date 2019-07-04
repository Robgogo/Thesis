import React, { Component } from "react";

import Chartist from "chartist";
require("chartist-plugin-tooltips");
require("chartist-plugin-axistitle");

class StackedChart extends Component {
  incomeExpenseStackedBar() {
    if (!document.getElementById("ieStackedBarChart")) {
      return false;
    }

    var options, _responsiveOptions;

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

    let { labels, data } = this.props;
    data = {
      labels: labels,
      series: data
    };
    options = {
      height: "250px",
      stackBars: true,
      fullWidth: true,
      chartPadding: {
        right: 40
      },
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
              y: 35
            }
          },
          axisY: {
            axisTitle: "Flow Rate",
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
    new Chartist.Bar("#ieStackedBarChart", data, options, _responsiveOptions);
  }
  componentDidMount() {
    this.incomeExpenseStackedBar();
  }

  render() {
    return (
      <div className="col-xs-12 col-md-12">
        <div className="card card-box card-success">
          <div className="card-body chart-container">
            <div id="ieStackedBarChart" />
          </div>
        </div>
      </div>
    );
  }
}

export default StackedChart;
