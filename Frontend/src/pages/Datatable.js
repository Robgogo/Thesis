import React, { Component } from "react";
import ReactExport from "react-data-export";
import axios from "axios";


const jQuery = require("jquery");
const fs=require("browserify-fs");
require("datatables.net");
require("datatables.net-bs4");
require("datatables.net-responsive");
require("datatables.net-responsive-bs4");

const $ = jQuery;

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [];

class Datatable extends Component {

  constructor() {
    super();
    this.state = {
      data:[],
    };
  }

  getData(){
    axios.get("http://vast-eyrie-51209.herokuapp.com/api/data")
    .then(response=>{
      let tempData=response.data.reverse();
      let dat={
        data:[

        ]
      }
      for(let i=0;i<tempData.length;i++){
        dat.data[i]=[JSON.parse(tempData[i]).id,JSON.parse(tempData[i]).name,JSON.parse(tempData[i]).data.flowRate,JSON.parse(tempData[i]).data.level,JSON.parse(tempData[i]).latitude +" Lat, "+JSON.parse(tempData[i]).longitude+" Long",JSON.parse(tempData[i]).data.timeOfReading];
      }

      this.setState({data:tempData});
      let datatable=JSON.stringify(dat);
      console.log(datatable);
      jQuery("#employee_grid").DataTable({
        details: {
          renderer: function(api, rowIdx) {
            var data = api
              .cells(rowIdx, ":hidden")
              .eq(0)
              .map(function(cell) {
                var header = $(api.column(cell.column).header());
                return (
                  '<p style="color:#00A">' +
                  header.text() +
                  " : " +
                  api.cell(cell).data() +
                  "</p>"
                );
              })
              .toArray()
              .join("");
  
            return data ? $("<table/>").append(data) : false;
          }
        },
        data: dat.data,
        columns: [
          { title: "Id" },
          { title: "Sensor Id" },
          { title: "Flow " },
          { title: "Level" },
          { title: "Location" },
          { title: "Data registration" },
      ]
      });
    })
  }

  initializeDatatables() {
    jQuery("#employee_grid").DataTable({
      details: {
        renderer: function(api, rowIdx) {
          var data = api
            .cells(rowIdx, ":hidden")
            .eq(0)
            .map(function(cell) {
              var header = $(api.column(cell.column).header());
              return (
                '<p style="color:#00A">' +
                header.text() +
                " : " +
                api.cell(cell).data() +
                "</p>"
              );
            })
            .toArray()
            .join("");

          return data ? $("<table/>").append(data) : false;
        }
      },
      ajax: "../data/datatables.json"
    });
  }

  componentDidMount() {
    this.getData();
    // this.initializeDatatables();
  }
  render() {
    let j=1;
    const items=this.state.data.map((item,i)=>{
      let itm=JSON.parse(item);
      console.log("itm is",itm);
        dataSet1[j-1]={
          Sensor_name:itm.name,
          flow_rate:itm.data.flowRate,
          level:itm.data.level,
          location:itm.latitude + " Lat, "+itm.longitude+" Long",
          timeOfReading:itm.data.timeOfReading
        };
        j++;
    });
    console.log(items);
    return (
      <div id="datatables">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading-container">
                <div className="header-title">
                  <h1>Collected Data</h1>
                </div>
                <div>
                  <ExcelFile
                    element={
                      <div className="col-xs-offset-4 col-xs-6">
                        <button type="button" className="btn btn-success">
                          Export to Excel
                        </button>
                      </div>
                    }
                  >
                    <ExcelSheet data={dataSet1} name="River Data">
                    <ExcelColumn label="Name" value="Sensor_name" />
                    <ExcelColumn label="Flow Rate" value="flow_rate" />
                    <ExcelColumn label="Level" value="level" />
                    <ExcelColumn label="Location" value="location" />
                    <ExcelColumn label="Time Of Reading"value="timeOfReading"/>
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              </div>
            </div>
            <div className="clearfix" />

            {/* <!-- Datatables Info --> */}
            <div className="col-md-12">
              <div className="card card-box card-success">
                <div className="card-body">
                  <table
                    className="table table-hover table-striped table-bordered dt-responsive nowrap"
                    id="employee_grid"
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Sensor Id</th>
                        <th>Flow rate (L/m)</th>
                        <th>Level (M)</th>
                        <th>Location</th>
                        <th>Date Registered</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            {/*atable. <!-- Datatables Info - End --> */}
          </div>
        </div>
      </div>
    );
  }datatabdatatablesles
}

export default Datatable;
