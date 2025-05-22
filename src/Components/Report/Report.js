import React, { useState, useEffect } from 'react'
import { stream } from 'xlsx'
import { base } from '../../Constants/Data.constant'
import { getData } from '../../Services/Ops'
import ChartZoomPan from '../Common/Chart/ChartZoomPan'
import CircleGraph from '../Common/Chart/CircleGraph'
import MarketGraph from '../Common/Chart/MarketGraph'
import CustomPieChart from '../Common/Chart/PaiChart'
import SimpleGraph from '../Common/Chart/SimpleGraph'
import SplineChart from '../Common/Chart/SplineChart'
// import DrillDown from '../Common/Chart/DrillDown'
import { Nav } from '../Common/Nav'
import { SideBar } from '../Common/SideBar'
import * as XLSX from 'xlsx';

export default function Report() {
    const [topStoresTab, setTopStoresTab] = useState("graph");
    const [marketListTab, setMarketListTab] = useState("graph");
    const [streamListTab, setStreamListTab] = useState("graph");
    const [trackListTab, setTrackListTab] = useState("graph");
    const [insideTab, setInsideTab] = useState("graph");


    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [topStores, setTopStores] = useState([])
    const [marketList, setMarketList] = useState([])
    const [streamList, setStreamList] = useState([])
    const [trackList, setTrackList] = useState([])
    const [insideList, setInsideList] = useState([])


    useEffect(() => {
        let query = ``;
        getStore(query);
        getMarket(query);
        getOverView(query);
        getTracks(query)
        // getInside(query)
    }, [])
    const getStore = async (query) => {
        let result = await getData(base.getStoreReport + `?${query}`)
        console.log("getStore------------", result)
        if (result?.status) {
            let arr = []
            result?.data?.map((item, index) => {
                arr.push({ name: item.Store, y: item.Earnings_GBP, Excel: item.Excel })
            })
            setTopStores(arr)
        } else {
            setTopStores([])
        }
    }
    const getMarket = async (query) => {
        let result = await getData(base.getMarketReport + `?${query}`)
        console.log(result)
        if (result?.status) {
            let arr = []
            result.data?.map((item, index) => {
                arr.push({ x: index, label: item.Market, y: item.Earnings_GBP, Excel: item.Excel })
            })
            setMarketList(arr);
        } else {
            setMarketList([]);

        }
    }
    const getOverView = async (query) => {
        let result = await getData(base.getOverViewReport + `?${query}`)
        console.log("result stream-------", result)
        if (result?.status) {
            let arr = []
            result.data?.map((item, index) => {
                arr.push({ x: index, label: item.Date, y: item.Earnings_GBP, Excel: item.Excel })
            })
            setStreamList(arr);
        } else {
            setStreamList([]);

        }
    }
    const getTracks = async (query) => {
        let result = await getData(base.getTracksReport + `?${query}`)
        console.log("result getTracks-------", result)
        if (result?.status) {
            let arr = []
            result.data?.map((item, index) => {
                arr.push({ x: index, label: item.Track, y: item.Earnings_GBP, Excel: item.Excel })
            })
            setTrackList(arr);
        } else {
            setTrackList([]);

        }
    }

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

    const downloadFile = (url, name) => {
        if (!url || url === "") {
            alert("No file available to download");
            return;
        }

        try {
            // Create a temporary anchor element
            const link = document.createElement('a');

            // Ensure URL uses HTTPS instead of HTTP
            if (url.startsWith('http:')) {
                url = url.replace('http:', 'https:');
            }

            // Check if URL is relative and convert to absolute if needed
            if (url.startsWith('/') && !url.startsWith('//')) {
                url = window.location.origin + url;
            }

            link.href = url;

            // Extract filename from URL or use a default name
            const filename = url.split('/').pop() || name + '.xlsx';
            link.download = filename;

            // Set additional attributes that might help in production
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();

            // Small timeout before removing to ensure the download starts
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
        } catch (error) {
            console.error("Error downloading file:", error);
            alert("Failed to download file. Please try again.");
        }
    }

    return (
        <div>
            <SideBar />
            <div className="main-cotent">
                <Nav />
                <div className="content-main">
                    <section className="page-heading">
                        <h1>Financial Report</h1>
                    </section>

                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="releaseDate">Start Date</label>
                                <input
                                    value={startDate}
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="releaseDate">End Date</label>
                                <input
                                    value={endDate}
                                    type="date"
                                    className="form-control"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="releaseDate"> .{" "}</label>
                                <input
                                    value={"Search"}
                                    type="Submit"
                                    className="form-control"
                                    onClick={() => {
                                        let query = `startDate=${startDate}&&endDate=${endDate}`;
                                        getStore(query);
                                        getMarket(query);
                                         getOverView(query);
                                        getTracks(query);
                                        // getInside(query)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="form-group">
                                <label htmlFor="quickSelect">Quick Select</label>
                                <select 
                                    className="form-control" 
                                    id="quickSelect"
                                    onChange={(e) => {
                                        const today = new Date();
                                        const selectedValue = e.target.value;
                                        let newStartDate = new Date();
                                        
                                        switch(selectedValue) {
                                            case '1month':
                                                newStartDate.setMonth(today.getMonth() - 1);
                                                break;
                                            case '3months':
                                                newStartDate.setMonth(today.getMonth() - 3);
                                                break;
                                            case '6months':
                                                newStartDate.setMonth(today.getMonth() - 6);
                                                break;
                                            case '1year':
                                                newStartDate.setFullYear(today.getFullYear() - 1);
                                                break;
                                            default:
                                                newStartDate = today;
                                        }
                                        
                                        setStartDate(newStartDate.toISOString().split('T')[0]);
                                        setEndDate(today.toISOString().split('T')[0]);
                                        
                                        // Trigger search with new dates
                                        let query = `startDate=${newStartDate.toISOString().split('T')[0]}&&endDate=${today.toISOString().split('T')[0]}`;
                                        getStore(query);
                                        getMarket(query);
                                        getOverView(query);
                                        getTracks(query);
                                    }}
                                >
                                    <option  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#ffffff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer'
                  }} value="">Select Period</option>
                  <option  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#ffffff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer'
                  }} value="1month">Last 1 Month</option>
                  <option  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#ffffff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer'
                  }} value="3months">Last 3 Months</option>
                  <option  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#ffffff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer'
                  }} value="6months">Last 6 Months</option>
                  <option  style={{
                    backgroundColor: '#2b2b2b',
                    color: '#ffffff',
                    border: '1px solid #444',
                    borderRadius: '4px',
                    padding: '8px',
                    cursor: 'pointer'
                  }} value="1year">Last 1 Year</option>
                                </select>
                            </div>
                        </div>
                    </div>



                    <section className="daily-trend content">


                        <div className="top-store dash-detail dash-detail-two ">

                            <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                <div class="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="add-track-btn">
                                        <button onClick={() => { setTopStoresTab("graph") }} className={topStoresTab == "graph" ? "btn btn-primary" : "btn btn"}>Graph</button>
                                    </div>
                                    <div className="add-track-btn">
                                        <button onClick={() => { setTopStoresTab("table") }} className={topStoresTab == "table" ? "btn btn-primary" : "btn btn"}>Table</button>
                                    </div>
                                </div>
                                <h2>Top Store</h2>

                                <div className="add-track-btn">
                                    <button className="btn btn-primary "
                                        onClick={() => {
                                            exportTableToExcel('topstore', 'topstore.xlsx')
                                        }}>Download</button>
                                </div>
                            </div>

                            {topStores.length > 0 ?
                                <div class="gap-4">
                                    {topStoresTab == 'graph' ?
                                        <div class='col-lg-12 col-12'>
                                            <div className="dash-detail">
                                                <div className="box-body">
                                                    <CustomPieChart data={topStores} size={'full'} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-12 col-12">
                                            <h3>Store Earning</h3>

                                            <table id="topstore" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: "420px", overflowY: "auto", display: "block", border: 0 }} >
                                                <thead>
                                                    <tr role="row">
                                                        <th >#</th>
                                                        <th >name</th>
                                                        <th >Earnings(GBP)</th>
                                                        <th>Excel Data</th>
                                                    </tr>
                                                </thead>
                                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                                    {topStores.length > 0 && topStores.map((item, index) => (
                                                        <tr className="odd">
                                                            <td className="  sorting_1">{index + 1}</td>
                                                            <td className="  sorting_1">{item.name}</td>
                                                            <td className="  ">{item.y}</td>
                                                            <td> {item.Excel != "" &&
                                                                <a onClick={() => { downloadFile(item.Excel, item.name) }}>
                                                                    <i className="fa fa-download"></i> Download Excel
                                                                </a>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                    <img className="img-fluid" title="Dashboard" src={require('../../assets/images/nodatafound.png')} />
                                </>
                            }
                        </div>

                        <div className="top-store dash-detail dash-detail-two">
                            <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                <div class="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="add-track-btn">
                                        <button onClick={() => { setMarketListTab("graph") }} className={marketListTab == "graph" ? "btn btn-primary" : "btn btn"}>Graph</button>
                                    </div>
                                    <div className="add-track-btn">
                                        <button onClick={() => { setMarketListTab("table") }} className={marketListTab == "table" ? "btn btn-primary" : "btn btn"}>Table</button>
                                    </div>
                                </div>
                                <h2>Market</h2>

                                <button className="btn btn-primary "
                                    onClick={() => {
                                        exportTableToExcel('market', 'marketData.xlsx')
                                    }}>Download</button>
                            </div>
                            {marketList.length > 0 ?
                                <div class='row'>
                                    {marketListTab == "graph" ?
                                        <div class='col-lg-12 col-12'>
                                            <div className="dash-detail">
                                                <div className="box-body">
                                                    <MarketGraph charDdata={marketList} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-12 col-12">
                                            <h3>Market Earning</h3>
                                            <table id="market" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: "420px", overflowY: "auto", display: "block", border: 0 }} >
                                                <thead>
                                                    <tr role="row">
                                                        <th >#</th>
                                                        <th >Label</th> 
                                                        <th >Earnings (GBP)</th>
                                                        <th>Excel Data</th>
                                                    </tr>
                                                </thead>
                                                <tbody role="alert" aria-live="polite" aria-relevant="all">
                                                    {marketList.length > 0 && marketList.map((item, index) => (
                                                        <tr className="odd">
                                                            <td className="  sorting_1">{index + 1}</td>
                                                            <td className="  sorting_1">{item.label}</td>
                                                            <td className="  ">{item.y}</td> 
                                                            <td> {item.Excel != "" &&
                                                                <a onClick={() => { downloadFile(item.Excel, item.name) }}>
                                                                    <i className="fa fa-download"></i> Download Excel
                                                                </a>
                                                            }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                    <h2>Market Earning</h2>
                                    <img className="img-fluid" title="Dashboard" src={require('../../assets/images/nodatafound.png')} />
                                </>
                            }
                        </div>

                        <div className="top-store dash-detail dash-detail-two">
                        <h2>Track Earning</h2>
                            <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">

                                <div class="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="add-track-btn">
                                        <button onClick={() => { setTrackListTab("graph") }} className={trackListTab == "graph" ? "btn btn-primary" : "btn btn"}>Graph</button>
                                    </div>
                                    <div className="add-track-btn">
                                        <button onClick={() => { setTrackListTab("table") }} className={trackListTab == "table" ? "btn btn-primary" : "btn btn"}>Table</button>
                                    </div>
                                </div>
                                
                                {trackListTab == "table" &&
                                    <button className="btn btn-primary "
                                        onClick={() => {
                                            exportTableToExcel('tracks', 'tracksData.xlsx')
                                        }}>Download</button>
                                }
                            </div>
                            <div className="dash-detail" style={{ marginTop: 20 }}>

                                {trackList.length > 0 ?
                                    trackListTab == "graph" ?
                                        <MarketGraph charDdata={trackList} />
                                        :
                                        <table id="tracks" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: "420px", overflowY: "auto", display: "block", border: 0 }} >
                                            <thead>
                                                <tr role="row">
                                                    <th >#</th>
                                                    <th >Label</th> 
                                                    <th >Earning (GBP)</th>
                                                    <th>Excel Data</th>
                                                </tr>
                                            </thead>
                                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                                                {trackList.length > 0 && trackList.map((item, index) => (
                                                    <tr className="odd">
                                                        <td className="  sorting_1">{index + 1}</td>
                                                        <td className="  sorting_1">{item.label}</td>
                                                        <td className="  ">{item.y}</td> 
                                                        <td> {item.Excel != "" &&
                                                            <a onClick={() => { downloadFile(item.Excel, item.name) }}>
                                                                <i className="fa fa-download"></i> Download Excel
                                                            </a>
                                                        }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    :
                                    <>
                                        
                                        <img className="img-fluid" title="Dashboard" src={require('../../assets/images/nodatafound.png')} />
                                    </>
                                }
                            </div>

                        </div>



                        <div className="top-store dash-detail dash-detail-two">
                        <h2>OverView Earning</h2>
                            <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                              
                                <div class="track-heading d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="add-track-btn">
                                        <button onClick={() => { setStreamListTab("graph") }} className={streamListTab == "graph" ? "btn btn-primary" : "btn btn"}>Graph</button>
                                    </div>
                                    <div className="add-track-btn">
                                        <button onClick={() => { setStreamListTab("table") }} className={streamListTab == "table" ? "btn btn-primary" : "btn btn"}>Table</button>
                                    </div>
                                </div>
                                {streamListTab == "table" &&
                                    <button className="btn btn-primary "
                                        onClick={() => {
                                            exportTableToExcel('stream', 'streamData.xlsx')
                                        }}>Download</button>
                                }
                            </div>


                            <div className="dash-detail" style={{ marginTop: 20 }}>

                                {streamList.length > 0 ?
                                    streamListTab == "graph" ?
                                        <SimpleGraph data={streamList} title={"Overview"} type={'column'} />
                                        :

                                        <table id="stream" className="table table-bordered table-hover dataTable" aria-describedby="example2_info" style={{ height: "420px", overflowY: "auto", display: "block", border: 0 }} >
                                            <thead>
                                                <tr role="row">
                                                    <th >#</th>
                                                    <th >Date</th>
                                                    <th > Earnings(GBP)</th> 
                                                    <th>Excel Data</th>

                                                </tr>
                                            </thead>
                                            <tbody role="alert" aria-live="polite" aria-relevant="all">
                                                {streamList.length > 0 && streamList.map((item, index) => (
                                                    <tr className="odd">
                                                        <td className="  sorting_1">{index + 1}</td>
                                                        <td className="  sorting_1">{item.label}</td>
                                                        <td className="  ">{item.y}</td> 
                                                        <td> {item.Excel != "" &&
                                                            <a onClick={() => { downloadFile(item.Excel, item.name) }}>
                                                                <i className="fa fa-download"></i> Download Excel
                                                            </a>
                                                        }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    :
                                    <>
                                       
                                        <img className="img-fluid" title="Dashboard" src={require('../../assets/images/nodatafound.png')} />
                                    </>
                                }
                            </div>
                        </div>



                    </section>
                </div>
            </div>
        </div>
    )
}