import React, { useEffect, useState } from 'react'
import { base } from '../../Constants/Data.constant';
import { useUserProfile } from '../../Context/UserProfileContext';
import useDashboardController from '../../Controllers/Dashboard-Controller/useDashboardController';
import { getData } from '../../Services/Ops';
import MarketGraph from '../Common/Chart/MarketGraph';
import SimpleGraph from '../Common/Chart/SimpleGraph';
import { Nav } from '../Common/Nav'
import { SideBar } from '../Common/SideBar'
export const Dashboard = () => {
  const { dashboardData } = useDashboardController(); 
  const { userProfile } = useUserProfile();

  const [marketList, setMarketList] = useState([])
  useEffect(() => {
    getMarket();
     console.log(dashboardData,">>>>>>");
  }, [])
  const getMarket = async () => {
    let result = await getData(base.getMarket)
    console.log(result)
    if (result?.status) {
      let arr = []
      result.data?.map((item, index) => {
        arr.push({ x: index, label: item.Market, y: item.Quantity })
      })
      setMarketList(arr);
    }
  }


  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-main">
          <section className="dash-main content">
            {(userProfile?.role == "company" || userProfile?.role === "employee") && 
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>All Release</p>
                      <h3>{dashboardData?.myReleaseCount}</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>All Tracks</p>
                      <h3>{dashboardData?.myTracksCount}</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>Total Tracks</p>
                      <h3>0</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>Total Pending Tracks</p>
                      <h3>{0}</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>Approve Content</p>
                      <h3>{0}</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-xs-6">
                  <div className="dash-detail d-flex flex-wrap">
                    <div className="inner">
                      <p>Reject Content</p>
                      <h3>{0}</h3>
                    </div>
                    <div className="icon">
                      <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                    </div>
                  </div>
                </div>

              </div>
            }
            {userProfile?.role == "Admin" &&

            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>All Release</p>
                    <h3>{dashboardData?.myReleaseCount}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>All Tracks</p>
                    <h3>{dashboardData?.myTracksCount}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>Total Tracks</p>
                    <h3>0</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>Total Pending Tracks</p>
                    <h3>{0}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>Approve Content</p>
                    <h3>{0}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>Reject Content</p>
                    <h3>{0}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon2.png')} />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="dash-detail d-flex flex-wrap">
                  <div className="inner">
                    <p>Master Account</p>
                    <h3>{dashboardData.masterAccount}</h3>
                  </div>
                  <div className="icon">
                    <img className="img-fluid" src={require('../../assets/images/dash-icon1.png')} />
                  </div>
                </div>
              </div>
            </div>

           }  
          </section>
          {userProfile?.role === "company" &&
            <section className="sale-graph">
              {marketList.length > 0 ?
                <SimpleGraph data={marketList} title={"Market"} />
                :
                <>
                  <h2>Market Data</h2>
                  <img className="img-fluid" title="Dashboard" src={require('../../assets/images/nodatafound.png')} />
                </>

              }
            </section>
          }
        </div>
      </div>
    </div>
  )
}