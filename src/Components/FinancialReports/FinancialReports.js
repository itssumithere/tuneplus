import React, { useState,useEffect } from 'react'
import { base } from '../../Constants/Data.constant';
import { getData } from '../../Services/Ops';
import { Nav } from '../Common/Nav'
import { SideBar } from '../Common/SideBar'
import AutomaticReports from './AutomaticReport';
import RequestedReports from './RequestedReports';
import "./styles.css";
export default function FinancialReport() {
const [activeTab, setActiveTab] = useState("automatic");
const [report,setReport]= useState([])
useEffect(() => {
  getReoprt(); 
}, [])
const getReoprt = async () => {
  let result = await getData(base.getReport)
  console.log("getReoprt------------", result)
  setReport(result?.data)
    // setTopStores(arr)
  } 
return (
<div>
  <SideBar/>
  <div className="main-cotent">
    <Nav />
    <div className="content-main">
      <section className="page-heading">
        <h1>Financial Reports</h1>
      </section>
      <section className="content">
        <div className="steps-main reports-outer">
          {/* 
          <h2>AVAILABLE REPORTS</h2>
          */}
          <div className="step-tab report-tab">
            <button
            className={`tab ${activeTab === "automatic" ? "active" : ""}`}
            onClick={() => setActiveTab("automatic")}
            >
            Automatic reports
            </button>
            <button
            className={`tab ${activeTab === "requested" ? "active" : ""}`}
            onClick={() => setActiveTab("requested")}
            >
            Requested reports
            </button>
          </div>
          {activeTab === "automatic" ?
          <AutomaticReports report={report}/>
          :
          <RequestedReports />
          }
        </div>
      </section>
    </div>
  </div>
</div>
)
}