import React, { Component } from "react";
import ReactExport from "react-data-export";
import axios from 'axios';

import LineChart from "../components/charts/LineChart";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
let dataSet2=[];
let dataSet3=[];

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      labels: [],
      data:[],
      flowRateData:[],
      levelData:[]
    };
  }

  componentDidMount(){
    this.getData();
  }


  getData(){
    axios.get("http://vast-eyrie-51209.herokuapp.com/api/data")
    .then(response=>{
      
      let data=[];
      let label=[];
      let fData=[];
      let lData=[];
      let tepData = response.data.reverse();
      for(let i=0;i<tepData.length;i++){
        label[i]=JSON.parse(tepData[i]).data.timeOfReading;
        fData[i]=JSON.parse(tepData[i]).data.flowRate;
        lData[i]=JSON.parse(tepData[i]).data.level;
      }
      this.setState({data: tepData, labels: label, flowRateData: fData,levelData: lData});
    })
    .catch(err=>console.log(err));
  }

  render() {
    let j=1;
    let k=1;

    const items=this.state.data.map((item,i)=>{
      let itm=JSON.parse(item);
      while(j<=10){
        dataSet2[j-1]={
          Sensor_name:itm.name,
          flow_rate:itm.data.flowRate,
          location:itm.latitude + " Lat, "+itm.longitude+" Long",
          timeOfReading:itm.data.timeOfReading
        };
        return(
          <tr key={itm.id}>
            <td>{j++}</td>
            {/* <td>{itm.data.id}</td> */}
            <td>{itm.name}</td>
            <td>{itm.data.flowRate}</td>
            <td>{itm.latitude} Lat, {itm.longitude} Long</td>
            <td>{itm.data.timeOfReading}</td>
          </tr>
          )
      }
     
    });

    const items2=this.state.data.map((item,i)=>{
      let itm=JSON.parse(item);
      console.log("in items 2:",itm);
      while(k<=10){
        dataSet3[k-1]={
          Sensor_name:itm.name,
          flow_rate:itm.data.level,
          location:itm.latitude + " Lat, "+itm.longitude+" Long",
          timeOfReading:itm.data.timeOfReading
        };
        return(
          <tr key={itm.id}>
            <td>{k++}</td>
            {/* <td>{itm.data.id}</td> */}
            <td>{itm.name}</td>
            <td>{itm.data.level}</td>
            <td>{itm.latitude} Lat, {itm.longitude} Long</td>
            <td>{itm.data.timeOfReading}</td>
          </tr>
          )
      }
     
    });
    
    if(this.state.data.length===0){
      return <p>Waiting for data</p>;
    }

    return (
      <div className="home">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading-container">
                <div className="header-title">
                  <h1>Dashbaord</h1>
                </div>
              </div>
              {/* <div className="col-xs-offset-4 col-xs-6">
                <ExcelFile
                  element={
                    <div>
                      <button type="button" className="btn btn-success">
                        Export to Excel
                      </button>
                    </div>
                  }
                >
                  <ExcelSheet data={dataSet2} name="Flow Rate">
                    <ExcelColumn label="Name" value="Sensor_name" />
                    <ExcelColumn label="Flow Rate" value="flow_rate" />
                    <ExcelColumn label="Location" value="location" />
                    <ExcelColumn label="Time Of Reading"value="timeOfReading"/>
                  </ExcelSheet>
                </ExcelFile>
              </div> */}
            </div>
            {/* Overall Info */}

            {/* Overall Info */}

            <div className="col-md-12">
              <div className="card card-box card-success">
                <div className="card-header">
                  <h2>Flow Rate Data</h2>
                </div>
                <div className="card-body">
                  <table
                    className="table table-hover table-striped table-bordered dt-responsive nowrap"
                    id="flow"
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Sensor Id</th>
                        <th>Flow rate (L/m)</th>
                        <th>Location</th>
                        <th>Date Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <LineChart labels={this.state.labels} data={this.state.flowRateData} height="200" title="Flow Rate" />

            {/* <div className="col-xs-offset-4 col-xs-6">
                <ExcelFile
                  element={
                    <div>
                      <button type="button" className="btn btn-success">
                        Export to Excel
                      </button>
                    </div>
                  }
                >
                  <ExcelSheet data={dataSet3} name="Flow Rate">
                    <ExcelColumn label="Name" value="Sensor_name" />
                    <ExcelColumn label="Water Level" value="level" />
                    <ExcelColumn label="Location" value="location" />
                    <ExcelColumn label="Time Of Reading"value="timeOfReading"/>
                  </ExcelSheet>
                </ExcelFile>
              </div> */}

            {/* Overall Info */}

            {/* Overall Info */}
            <div className="col-md-12">
              <div className="card card-box card-success">
                <div className="card-header">
                  <h2>Water Level Data</h2>
                </div>
                <div className="card-body">
                  <table
                    className="table table-hover table-striped table-bordered dt-responsive nowrap"
                    id="level"
                  >
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Sensor Id</th>
                        <th>Level (M)</th>
                        <th>Location</th>
                        <th>Date Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items2}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <LineChart labels={this.state.labels} data={this.state.levelData} height="200" title="Water Level"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
