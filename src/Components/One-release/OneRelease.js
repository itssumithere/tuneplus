import React from 'react'
import { useNavigate } from 'react-router-dom';
import OneReleaseController from '../../Controllers/One-release-controller/OneReleaseController';
import { Nav } from '../Common/Nav'
import { SideBar } from '../Common/SideBar'
import * as XLSX from 'xlsx';
export const OneRelease = () => {
const navigate = useNavigate();
const { setType, setTitle, handleSubmit, myRelease, moreAction, isLoading, myTracks, setMyTracks } = OneReleaseController();
function exportTableToExcel(tableId, fileName = 'TableData.xlsx') {
// Get the table element by ID
const table = document.getElementById(tableId);
if (!table) {
console.error(`Table with ID ${tableId} not found.`);
return;
}
// Convert table to a worksheet
const worksheet = XLSX.utils.table_to_sheet(table);
// Create a new workbook and add the worksheet to it
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
// Export the workbook to an Excel file
XLSX.writeFile(workbook, fileName);
}
return (
<div>
  <SideBar/>
  <div className="main-cotent">
    <Nav />
    <div className="content-main">
      <div className="page-heading">
        <h1>One Release</h1>
      </div>
      <section className="content">
        <div className="dash-detail dash-detail-two new-release">
          <h2>New Release</h2>
          <p>What is the type of your new release?</p>
          <div className="form-main">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="type" id="type" value="Audio" checked="true" onChange={(e) => setType(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio1">Audio</label>
            </div>
            {/* <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="type" id="type" value="Video" onChange={(e) => setType(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio2">Video</label>
            </div> */}
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="type" id="type" value="Ringtone" onChange={(e) => setType(e.target.value)}/>
              <label className="form-check-label" for="inlineRadio3">Ringtone</label>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Release Title *</label>
              <input type="text" className="form-control" id="releaseTitle" placeholder="Enter Release Title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="Submit-btn">
              <button type="Submit" id="btnSubmit" className="btn btn-primary" onClick={() => { handleSubmit() }}>Submit</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
);
};