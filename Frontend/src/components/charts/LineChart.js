import React, { Component } from "react";

import Chartist from "chartist";
import ChartistGraph from 'react-chartist';

require("chartist-plugin-tooltips");
require("chartist-plugin-axistitle");

class LineChart extends Component {

  constructor(props){
    super(props);
    this.state={
      labels:props.labels,
      data:props.data,
      height:props.height
    }
    // this.createLineChart();
  }

  createLineChart() {
    // console.log(this.props);

    if (!document.getElementById("flowRateLineChart")) {
      return false;
    }
    let options, _responsiveOptions;
    _responsiveOptions = [
      [
        "screen and (max-width: 1000px)",
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
    // console.log("Props in method:",this.props);
    let { labels, data, height } = this.props;
    data = {
      labels: labels,
      series: data
    };
    options = {
      fullWidth: true,
      chartPadding: {
        right: 40
      },
      plugins: [
        Chartist.plugins.tooltip({
          FlowRate: "l/m ",
          appendToBody: true
        }),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "Date ",
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
    if (height) {this.setState({})
      options.height = height;
    }

    this.setState({data, options, labels});
    // new Chartist.Line("#flowRateLineChart", data, options, _responsiveOptions);
  }

  componentDidMount() {
    // this.createLineChart();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    // this.props=nextProps;
    this.setState({labels:nextProps.labels,data:nextProps.data,height:nextProps.height});
    
  }



  render() {
    // let { labels, data, height } = this.props;
    
    // if(labels.length === 0 || data.length === 0 ) {
    //   return <p>Loading </p>
    // }
    // console.log('labels ', labels, ' data ', data);
    // this.createLineChart();


    let { labels, data, height } = this.props;

    if(data.length === 0 || labels.length === 0) {
      return <p>Loading</p>
    };

    data = {
      labels: labels,
      series: [data]
    };
    var options = {
      fullWidth: true,
      chartPadding: {
        right: 40
      },
      plugins: [
        Chartist.plugins.tooltip({
          FlowRate: "l/m ",
          appendToBody: true
        }),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "Date ",
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

    // data = {
    //   labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
    //   series: [
    //     [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
    //   ]
    // };

    // options = {
    //   high: 10,
    //   low: -10,
    //   axisX: {
    //     labelInterpolationFnc: function(value, index) {
    //       return index % 2 === 0 ? value : null;
    //     }
    //   }
    // };

    var type = 'Line'


    // console.log("props",this.props);
    return (
      <div className="col-xs-12 col-md-12">
        <div className="card card-box card-success">
          <div className="card-header">
            <h2>{this.props.title}</h2>
          </div>
          <div className="card-body chart-container">
            {/* <div id="flowRateLineChart" /> */}
            <ChartistGraph data={data} options={options} type={type} />
          </div>
        </div>
      </div>
    );
  }
}

export default LineChart;
