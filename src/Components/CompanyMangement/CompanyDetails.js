import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Nav } from '../Common/Nav'
import Papa from 'papaparse'
import { getData, postData } from '../../Services/Ops';
import { base } from '../../Constants/Data.constant';
import Swal from 'sweetalert2';
import { SideBar } from '../Common/SideBar';
export default function CompanyDetails() {

  const location = useLocation();
  const userId = location.state?.userId;

  const [jsonData, setJsonData] = useState(null); // State to store parsed JSON data
  const [error, setError] = useState(''); // State for error messages
  const [trackList, setTrackList] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [allReport, setAllReport] = useState({})




  useEffect(() => {
    getTrack()
    getClientNo(userId);
    getAllReport()
  }, [])



  const getClientNo = async (userId) => {
    try {
      const body = { userId };
      const result = await postData(base.getUser, body);
      console.log("get user", result);
      setUserDetails(result?.data?.data);
    } catch (error) {
      console.error("Error fetching client number:", error);
      return null;
    }
  };



  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'text/csv') {
        setError(''); // Reset error if file is valid
        parseCSV(file); // Call function to parse CSV
      } else {
        setError('Please upload a valid CSV file.');
      }
    }
  };


  // const parseCSV = (file) => {
  //   Papa.parse(file, {
  //     complete: (result) => {
  //       console.log('CSV Parsed:', result);        // console.log('JSON with cleaned keys:', json);
  //       setJsonData(result.data); // Store JSON data in state
  //     },
  //     header: true, // Treat first row as header
  //     skipEmptyLines: true, // Skip empty lines in CSV
  //   });
  // };


  // Parse the CSV file and convert it to JSON
  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        console.log('CSV Parsed:', result);

        // Remove spaces in keys with two or three words
        const json = result.data.map((row) => {
          const cleanedRow = {};
          Object.keys(row).forEach((key) => {
            const cleanedKey = key.trim().replace(/\s+/g, ''); // Trim and remove spaces within the key
            cleanedRow[cleanedKey] = row[key]; // Assign the value to the cleaned key
          });
          return cleanedRow;
        });

        console.log('JSON with cleaned keys:', json);
        setJsonData(json); // Store JSON data in state
      },
      header: true, // Treat first row as header
      skipEmptyLines: true, // Skip empty lines in CSV
    });
  };








  const uploadExcel = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    let result = await postData(base.uploadTracks, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
      getAllReport()
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }

  const uploadStoreExcel = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    let result = await postData(base.uploadStore, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }


  const uploadMarketExcel = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    let result = await postData(base.uploadMarket, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }

  const getTrack = async () => {
    let result = await getData(base.getTracks)
    console.log(result)
    setTrackList(result.data)
  }


  const uploadMarketStream = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    let result = await postData(base.sendStream, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }

  const uploadReportStream = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    // uploadDataInChunks(jsonData, 100)
    // console.log(jsonData)
    let result = await postData(base.sendReport, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }

  const uploadInside = async () => {
    let body = {
      userId: userId,
      data: jsonData
    }
    // uploadDataInChunks(jsonData, 100)
    // console.log(jsonData)
    let result = await postData(base.sendInside, body)
    console.log(result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }

  const uploadDataInChunks = async (data, chunkSize) => {
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      const body = {
        userId: userId,
        data: chunk
      };

      try {
        const result = await postData(base.sendReport, body);
        if (!result.ok) {
          const error = await result.json();
          throw new Error(`Server Error: ${error.message}`);
        }
        console.log(`Chunk ${i / chunkSize + 1} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading chunk ${i / chunkSize + 1}:`, error.message);
        console.error("Failed chunk data:", JSON.stringify(chunk));
      }
    }
  };


  const getAllReport = async () => { 
    setAllReport([])
    let body = {
      userId: userId
    }
    let result = await postData(base.getAllReport, body)
    console.log("resultresultresultresultresult", result)
    setAllReport(result?.data?.data)
  }

  const deleteData = async (name) => {
    let body = {
      userId: userId,
      type: name
    }

    let result = await postData(base.deleteStore, body)
    console.log("resultresultresultresultresult", result)
    if (result.data.status === true) {
      Swal.fire("Success", result.message, result.message);
      getAllReport()
    } else {
      Swal.fire("Error", result.message, result.message);
    }
  }
  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-wrapper">
          <br></br>
          <br></br>
          <div className="audio-table release-inner dash-detail dash-detail-two mb-4">
            <div className="release-title">
              <h2>User Information</h2>
              <div className="release-detail d-flex flex-wrap mt-3">
                {Object.entries(userDetails).map(([key, value]) => (
                  key != 'bankDetails' && key != '_id' && key != 'password' && key != 'is_active' && key != 'Is_deleted' && key != '_v' && <p className="release-data" key={key}>

                    <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
                      <p>{value}</p>
                    </strong>
                  </p>

                ))}
              </div>
            </div>
          </div>


          <div className="audio-table release-inner dash-detail dash-detail-two mb-4">
            <div className="release-title">
              <h2>Bank Information</h2>
              <div className="release-detail d-flex flex-wrap mt-3">

                <p className="release-data" >
                  <strong>
                    Bank Name
                  </strong>{" "}
                  <span>{userDetails?.bankDetails?.bankName}</span>
                </p>
                <p className="release-data" >

                  <strong>
                    Account Number
                  </strong>{" "}
                  <span>{userDetails?.bankDetails?.accountNumber}</span>
                </p>
                <p className="release-data" >

                  <strong>
                    Account Holder Name
                  </strong>{" "}
                  <span>{userDetails?.bankDetails?.accountHolder}</span>
                </p>
                <p className="release-data" >
                  <strong>
                    Account Type
                  </strong>{" "}
                  <span>{userDetails?.bankDetails?.accountType}</span>
                </p>
                <p className="release-data" >
                  <strong>
                    Ifsc Code
                  </strong>{" "}
                  <span>{userDetails?.bankDetails?.ifscCode}</span>
                </p>

              </div>
            </div>
          </div>



          <div className="dash-detail " key={allReport?.storeData?.length}>
            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Store Upload Excel</h3>
                <section className="content-header">

                  {/* Upload Input */}


                  {allReport?.storeData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.storeData.length > 0 && allReport?.storeData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.Store}</td>
                                <td className="  ">{item.Quantity}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("store")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group">
                          <button
                            onClick={() => uploadStoreExcel()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>


                    </div>
                  }



                </section>
              </div>
            </div>
          </div>
          <br></br>
          <div className="dash-detail ">

            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Market Upload Excel</h3>
                <section className="content-header">

                  {allReport?.marketData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: 300, overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.marketData.length > 0 && allReport?.marketData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.Market}</td>
                                <td className="  ">{item.Quantity}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("market")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            onClick={() => uploadMarketExcel()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  }


                </section>
              </div>
            </div>
          </div>
          <br></br>

          <div className="dash-detail ">
            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Tracks Upload Excel</h3>
                <section className="content-header">
                  {allReport?.trackData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: 300, overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.trackData.length > 0 && allReport?.trackData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.Track}</td>
                                <td className="  ">{item.Quantity}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("track")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          // onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            onClick={() => uploadExcel()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  }



                </section>
              </div>
            </div>
          </div>
          <br></br>

          <div className="dash-detail ">

            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Stream Upload Excel</h3>
                <section className="content-header">

                  {allReport?.streamData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: 300, overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.streamData.length > 0 && allReport?.streamData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.dsp}</td>
                                <td className="  ">{item.streams}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("stream")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          // onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            onClick={() => uploadMarketStream()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  }



                </section>
              </div>
            </div>
          </div>
          <br></br>

          <div className="dash-detail ">
            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Report Upload Excel</h3>
                <section className="content-header">

                  {allReport?.salesAssetsData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: 300, overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.salesAssetsData.length > 0 && allReport?.salesAssetsData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.DSP}</td>
                                <td className="  ">{item.SaleID}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("stream")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          // onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            onClick={() => uploadReportStream()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  }


                </section>
              </div>
            </div>
          </div>
          <br></br>



          <div className="dash-detail ">
            <div className="col-md-12">
              <div className="">
                <h3 className="mb-4">Inside Upload Excel</h3>
                <section className="content-header">

                  {allReport?.insidesData?.length > 0 ?
                    <div>
                      <div className="col-md-6">

                        <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: 300, overflowY: "auto", display: "block", border: 0 }} >
                          <thead>
                            <tr role="row">
                              <th >#</th>
                              <th >name</th>
                              <th > Quantity</th>
                            </tr>
                          </thead>
                          <tbody role="alert" aria-live="polite" aria-relevant="all">
                            {allReport?.insidesData.length > 0 && allReport?.insidesData.map((item, index) => (
                              <tr className="odd">
                                <td className="  sorting_1">{index + 1}</td>
                                <td className="  sorting_1">{item.Title}</td>
                                <td className="  ">{item.Label}</td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                        <button
                          onClick={() => deleteData("inside")}
                          type="Submit"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                    :
                    <div className="row">
                      {/* Left Column */}
                      <div className="col-md-6">
                        <div className="form-group">
                          {/* <label className="form-label">Select Media Files:</label> */}
                          <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="form-control"
                          // onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <button
                            onClick={() => uploadInside()}
                            type="Submit"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  }



                </section>
              </div>
            </div>
          </div>
          <br></br>

          {/* <div className="dash-detail ">

            <section className="content">
              <br></br>
              <table id="example2" className="table table-bordered table-hover dataTable" aria-describedby="example2_info">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Track</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {trackList && trackList?.map((item, index) => {

                    return (
                      <tr style={{}} key={item._id}>
                        <td>{index + 1}</td>

                        <td>{item.Track}</td>
                        <td>{item.Quantity}</td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>
          </div> */}
        </div>

      </div>
    </div>
  )
}
