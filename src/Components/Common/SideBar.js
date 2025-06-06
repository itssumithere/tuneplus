import React, { useState, useEffect } from "react";
import { images } from "../../assets/images";
import { useUserProfile } from "../../Context/UserProfileContext";
import AuthController from "../../Controllers/Auth-controller/AuthController";
import axios from "axios";
import { base } from "../../Constants/Data.constant";
import { getData } from "../../Services/Ops";
import moment from "moment";
export const SideBar = (props) => {
  const { handleLogout } = AuthController()
  const { userPermission, userProfile } = useUserProfile()
  const [financialMenu, setFinancialMenu] = useState(false)
  const [subMenu, setSubMenu] = useState("")
  const [profileMenu, setProfileMenu] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [analyticsMenu, setAnalyticsMenu] = useState(false);
  const [financialReportMenu, setFinancialReportMenu] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const renderIcon = (name) => {
    return name == "Dashboard" ? "fa fa-dashboard"
      : name == "One Release" ? "fa fa-caret-square-o-left"
        : name == "Catalog" ? "fa  fa-bullseye"
          : name == "Daily Trends" ? "fa fa-clock-o"
            : name == "Financial" ? "fa  fa-money"
              : name == "User Mangement" ? "fa fa-users"
                : name == "User Mangement" ? "fa fa-retweet"
                  : name == "Withdraw Request" ? "fa fa-sort-amount-asc"
                    : name == "All Transcations" ? "fa fa-random"
                      : "fa fa-sort-amount-asc"
  }

  const downloadDatabase = async () => {
    try {
      // Show loading indicator or message to user
      console.log("Database download started...");
      // Make the API request
      const response = await getData(base.downloadDb);
      console.log("Download successful:", response);
      // if (response.data && response.data.status) {
      console.log("Download successful:", response.data);
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = moment(new Date()).format("DD-MM-YYY HH:MM:SS") + "musicDB.json";
      a.click();

      // If the API returns a file path or download URL
      // if (response.data.data && response.data.data.filePath) {
      //   // Create a download link for the file
      //   const link = document.createElement('a');
      //   link.href = `/api/download?path=${encodeURIComponent(response.data.data.filePath)}`;
      //   link.download = response.data.data.filePath.split('/').pop();
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);

      //   alert("Database downloaded successfully!");
      // } else {
      //   alert("Database processed successfully!");
      // }
      // } else {
      //   console.error("Download failed:", response.data);
      //   alert("Failed to download database. Please try again.");
      // }
    } catch (error) {
      console.error("Download error:", error);
      alert("Error downloading database: " + (error.message || "Unknown error"));
    }
  }
  return (
    <div className="sidebar-main" id="navbarSupportedContent">
      <div className="user-detail d-flex flex-wrap align-items-center">
        {/* <div className="user-img">
          <img className="img-fluid" src={require('../../assets/images/user.jpg')} />
        </div> */}
        {/* <div className="user-img"> */}
        <img className="img-fluid" src={require('../../assets/images/logo.png')} />
        {/* <p>Gold <span className="d-block">gold@gmail.com</span></p> */}
        {/* </div> */}
      </div>
      <ul className="navbar-nav">
        {userProfile.role == "Admin" && (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/Dashboard">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon1.png')} /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/CompanyManagement">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon2.png')} />Master Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/All releases">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon3.png')} /> All Releases
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/All Tracks">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon4.png')} />All Tracks
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="/Withdraw Request">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon5.png')} />Withdraw Request
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => downloadDatabase()}>
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon4.png')} />Download DB
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/Financial Report">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon6.png')} />Financial Report
              </a>
            </li> */}
          </>

        )}
        {userProfile.role === "company" && (
          <>
            <li className="nav-item">
              <a className="nav-link active" href="/Dashboard">
                <img className="img-fluid" title="Dashboard" src={require('../../assets/images/menu-icon1.png')} /> Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/One Release">
                <img className="img-fluid" title="One Release" src={require('../../assets/images/menu-icon2.png')} /> One Release
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/All releases">
                <img className="img-fluid" title="All Releases" src={require('../../assets/images/menu-icon3.png')} /> All Releases
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/All drafts">
                <img className="img-fluid" title="All Drafts" src={require('../../assets/images/menu-icon4.png')} /> All Drafts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setAnalyticsMenu(!analyticsMenu)}>
                <img className="img-fluid" title="Analytics" src={require('../../assets/images/menu-icon5.png')} /> Analytics
                <i className={`fa fa-chevron-${analyticsMenu ? 'up' : 'down'} ml-2`}></i>
              </a>
              {analyticsMenu && (
                <ul className="sub-menu" style={{
                  listStyle: 'none',
                  paddingLeft: '20px',
                  marginTop: '5px',
                }}>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/Daily Trends"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-chart-line"></i> Overview
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/DailyMarket"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-music"></i> Market Data
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/Dailytopstore"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-shopping-cart"></i> Store Data
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/DailyTrack"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-chart-bar"></i> Track Data
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/DailyStream"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-stream"></i> Store Stream
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Payment Operations">
                <img className="img-fluid" title="Payment Operations" src={require('../../assets/images/menu-icon6.png')} /> Payment Operations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setFinancialReportMenu(!financialReportMenu)}>
                <img className="img-fluid" title="Financial Report" src={require('../../assets/images/menu-icon7.png')} /> Financial Report
                <i className={`fa fa-chevron-${financialReportMenu ? 'up' : 'down'} ml-2`}></i>
              </a>
              {financialReportMenu && (
                <ul className="sub-menu" style={{
                  listStyle: 'none',
                  paddingLeft: '20px',
                  marginTop: '5px',
                }}>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/Report"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-chart-pie"></i> Overview
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/ReportTopStore"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-shopping-bag"></i> Store
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/ReportMarket"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-globe"></i> Market
                    </a>
                  </li>
                  <li>
                    <a 
                      className="nav-link" 
                      href="/ReportTrack"
                      style={{
                        padding: '8px 15px',
                        color: '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderRadius = '4px';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '';
                        e.target.style.borderRadius = '';
                      }}
                    >
                      <i className="fa fa-music"></i> Track
                    </a>
                  </li>
                  
                </ul>
              )}
            </li>
          </>
        )}
        <li>
          <a href="#" className="dropdown-item" onClick={handleLogout}>
            <i className="fa fa-sign-out" style={{ fontSize: 24 }}></i> Logout
          </a>
        </li>
        {userProfile.role === "employee" &&
          userPermission?.menuPermission?.map((item, index) => (
            <li className="nav-item" key={index}>
              <a className="nav-link" href={`/${item.mainMenuName}`}>
                <i className={renderIcon(item.mainMenuName)}></i> {item.mainMenuName}
              </a>
            </li>
          ))}
        <div className="user-detail d-flex flex-wrap " style={{ marginTop: 200 }}></div>
        <div className="user-detail d-flex flex-wrap item-align-center" >
          Copyright ©2025 J2P ENTERTAINMENT DIGITAL PRIVATE LIMITED
        </div>

      </ul>


    </div>




    // <nav>
    //   <div>
    //     <header className="main-header">
    //       <a className="logo">
    //         <b>Music Dashboard</b>
    //       </a>
    //       <nav className="navbar navbar-static-top" role="navigation">
    //         <div className="navbar-custom-menu">
    //           <ul className="nav navbar-nav">
    //             <li className="dropdown user user-menu">
    //               <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
    //                 <img
    //                   src={images?.user}
    //                   className="user-image"
    //                   alt="User Image"
    //                 />
    //                 <span className="hidden-xs">{userProfile?.name}</span>
    //               </a>

    //               {dropdownVisible &&
    //                 <div className="modal" style={{ display: 'block', marginTop: -50, }} onClick={toggleDropdown}>
    //                   <div style={{
    //                     position: 'absolute',
    //                     right: 0,
    //                   }}>
    //                     <div className="modal-content">
    //                       <div style={{}}>
    //                         <ul className="sidebar-menu">
    //                           <li className="treeview">
    //                             <a href="password change">
    //                               <i className="fa fa-lock"></i> <span>Change Password</span>
    //                             </a>
    //                           </li>
    //                         </ul>
    //                         <ul className="sidebar-menu">
    //                           <li className="treeview">
    //                             <a href="profile">
    //                               <i className="fa fa-user"></i> <span>Profile</span>
    //                             </a>
    //                           </li>
    //                         </ul>
    //                         {userProfile?.role == "company" &&
    //                           <>
    //                             <ul className="sidebar-menu">
    //                               <li className="treeview">
    //                                 <a href='User Access'>
    //                                   <i className="fa fa-sitemap"></i> <span>User Access</span>
    //                                 </a>
    //                               </li>
    //                             </ul>
    //                             <ul className="sidebar-menu">
    //                               <li className="treeview">
    //                                 <a href="bank information">
    //                                   <i className="fa fa-bank"></i> <span>Bank Information</span>
    //                                 </a>
    //                               </li>
    //                             </ul>
    //                             <ul className="sidebar-menu">
    //                               <li className="treeview">
    //                                 <a href="Support">
    //                                   <i className="fa fa-support"></i> <span>Support</span>
    //                                 </a>
    //                               </li>
    //                             </ul>

    //                           </>
    //                         }
    //                         <ul className="sidebar-menu">
    //                           <li className="treeview">
    //                             <a href="" onClick={() => handleLogout()}>
    //                               <i className="fa fa-sign-out"></i> <span>Logout</span>
    //                             </a>
    //                           </li>
    //                         </ul>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               }
    //             </li>
    //           </ul>
    //         </div>
    //       </nav>
    //     </header>
    //     <aside className="main-sidebar" style={{ backgroundColor: '#000', height: 'auto' }}>
    //       <section className="sidebar" style={{ backgroundColor: '#000' }}>
    //         <div className="user-panel" style={{ backgroundColor: '#000' }}>
    //           <div className=" image form-row" style={{ borderBottomStyle: 'solid', borderBottomWidth: 0, borderBottomColor: '#fff', marginTop: 10, padding: 5 }}>
    //             <img
    //               src={images.user}
    //               className="img-circle"
    //               alt="User Image"
    //             />
    //             <div>
    //               <span>{userProfile?.name}</span> <br></br>
    //               <span>{userProfile?.email}</span>
    //             </div>
    //           </div>
    //           <p >{userProfile?._id}</p>
    //         </div>

    //         {userProfile.role == "Admin"
    //           && <>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Dashboard" >
    //                   <i className="fa fa-dashboard"></i> <span>Dashboard</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/CompanyManagement" >
    //                   <i className="fa fa-clock-o"></i> <span>Master Account</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/All releases" >
    //                   <i className="fa  fa-bullseye"></i> <span>All Release</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/All Tracks" >
    //                   <i className="fa fa-clock-o"></i> <span>All Tracks</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Withdraw Request" >
    //                   <i className="fa fa-money"></i> <span>Withdraw Request</span>
    //                 </a>
    //               </li>
    //             </ul>
    //           </>
    //         }
    //         {userProfile.role == "company"
    //           && <>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Dashboard" >
    //                   <i className="fa fa-dashboard"></i> <span>Dashboard</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/One Release" >
    //                   <i className="fa fa-caret-square-o-left"></i> <span>One Release</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/All releases" >
    //                   <i className="fa  fa-bullseye"></i> <span>All Release</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/All drafts" >
    //                   <i className="fa fa-clock-o"></i> <span>All Draft</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Daily Trends" >
    //                   <i className="fa fa-retweet"></i> <span>Analytics</span>
    //                 </a>
    //               </li>
    //             </ul>

    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Payment Operations" >
    //                   <i className="fa  fa-money"></i> <span>Payment Operations</span>
    //                 </a>
    //               </li>
    //             </ul>
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 <a href="/Financial Report" >
    //                   <i className="fa fa-tree"></i> <span>Financial Report</span>
    //                 </a>
    //               </li>
    //             </ul>
    //           </>
    //         }

    //         {userProfile.role == "employee" && userPermission && userPermission?.menuPermission?.map((item, index) => {
    //           let link = `/${item.mainMenuName}`;
    //           return item.status &&
    //             item.mainMenuName != 'User Access' &&
    //             item.mainMenuName != 'Support' &&
    //             item.mainMenuName != 'Multiple Release' &&
    //             <ul className="sidebar-menu">
    //               <li className="treeview">
    //                 {item.submenu.length > 0 ?
    //                   <a onClick={() => { subMenu == index ? setSubMenu(-1) : setSubMenu(index) }}>
    //                     <i className={renderIcon(item.mainMenuName)}></i> <span>{item.mainMenuName}</span>
    //                   </a>
    //                   :
    //                   <a href={link}>
    //                     <i className={renderIcon(item.mainMenuName)}></i> <span>{item.mainMenuName}</span>
    //                   </a>
    //                 } </li>
    //               {index == subMenu ?
    //                 item.submenu.map((item, index) => {
    //                   let subMenuLink = `/${item.subMenuName}`;
    //                   return item.status && <li><a href={subMenuLink}><i className="fa fa-circle-o"></i>{item.subMenuName}</a></li>

    //                 })
    //                 :
    //                 <></>

    //               }

    //             </ul>
    //         })
    //         }

    //       </section>

    //     </aside>
    //   </div>
    // </nav>
  );
};