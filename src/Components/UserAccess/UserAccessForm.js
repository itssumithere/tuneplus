import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { base } from "../../Constants/Data.constant";
import { useUserProfile } from "../../Context/UserProfileContext";
import { getData, postData } from "../../Services/Ops";
import { Nav } from "../Common/Nav";
import { SideBar } from '../Common/SideBar'
import "./UserAccessForm.css";
import SearchableDropdown from "../Common/SearchableDropdown";
function UserAccessForm(props) {
  const navigate = useNavigate()
  const { userProfile } = useUserProfile()
  const [labelNameList, setLabelNameList] = useState([])
  const [airtestNameList, setaAirtestNameList] = useState([])
  const [menuPermission, setMenuPermission] = useState([]);
  const [otherPermission, setOtherPermission] = useState([
    { sectionName: "artist", status: true, list: [] },
    { sectionName: "label", status: true, list: [] },
    // { sectionName: "Channel", status: true, list: [] },
  ]);
  const [userPermission, setUserPermission] = useState({
    email: "",
    password: "",
    name: "",
    noOfLabel: "",
    role: userProfile.type == "Admin" ? "company" : "employee",
    pricePercentage: 0
  });
  const handleCheckboxChange = (e, category, index, subIndex = null) => {
    const { checked } = e.target;
    if (category == "menuPermission") {
      setMenuPermission((prev) => {
        const updated = [...prev];
        if (subIndex !== null) {
          updated[index].submenu[subIndex].status = checked;
        } else {
          updated[index].status = checked;
        }
        return updated;
      });
    } else if (category === "otherPermission") {
      setOtherPermission((prev) => {
        const updated = [...prev];
        updated[index].status = checked;
        return updated;
      });
    }
  };
  useEffect(() => {
    fetchLabel()
    fetchAirtest()
    getPermmissoin()
  }, [props, userProfile])
  const fetchLabel = async () => {
    let result = await getData(base.labelList);
    console.log(result)
    setLabelNameList(result.data)
  }
  const fetchAirtest = async () => {
    let result = await getData(base.fetchArtistList);
    console.log(result)
    setaAirtestNameList(result.data)
  }
  const getPermmissoin = () => {
    setMenuPermission(
      userProfile.role == "Admin" ?
        [
          {
            "mainMenuName": "Dashboard",
            "status": false,
            "submenu": []
          },
          {
            "mainMenuName": "One Release",
            "status": false,
            "submenu": []
          },
          {
            "mainMenuName": "Multiple Release",
            "status": false,
            "submenu": []
          },
          {


            "mainMenuName": "All releases",
            "status": false,
            "submenu": []
          },
          {
            "mainMenuName": "All drafts",
            "status": false,
            "submenu": []
          },
          {
            "mainMenuName": "Daily Trends",
            "status": false,
            "submenu": []
          },
          {
            "mainMenuName": "Financial",
            "status": false,
            "submenu": [
              {
                "subMenuName": "Payment Operations",
                "status": false,
                "submenu": []
              },
              {
                "subMenuName": "Financial Report",
                "status": false,
                "submenu": []
              }
            ]
          },
          {
            "mainMenuName": "User Access",
            "status": false,
            "submenu": []
          },
        ]
        :
        userProfile.role == "company" ?
          [
            {
              "mainMenuName": "Dashboard",
              "status": false,
              "submenu": []
            },
            {
              "mainMenuName": "One Release",
              "status": false,
              "submenu": []
            },
            // {
            //   "mainMenuName": "Multiple Release",
            //   "status": false,
            //   "submenu": []
            // },
            {


              "mainMenuName": "All releases",
              "status": false,
              "submenu": []
            },
            {
              "mainMenuName": "All drafts",
              "status": false,
              "submenu": []
            },
            {
              "mainMenuName": "Daily Trends",
              "status": false,
              "submenu": []
            },
            {
              "mainMenuName": "Financial",
              "status": false,
              "submenu": [
                {
                  "subMenuName": "Payment Operations",
                  "status": false,
                  "submenu": []
                },
                {
                  "subMenuName": "Financial Report",
                  "status": false,
                  "submenu": []
                }
              ]
            },
            {
              "mainMenuName": "Support",
              "status": false,
              "submenu": []
            }
          ]
          : userProfile.role == "employee" &&
          []
    )
  }
  const handleSubmit = async () => {
    const payload = {
      ...userPermission,
      menuPermission,
      artist : otherPermission?.[0].list,
      label : otherPermission?.[1].list,
    };
    if (userPermission.email == "" || userPermission.name == "") {
      Swal.fire("Error", "Please fill email , password and name", "error");
      return 0;
    }
    console.log("payload=======", payload)
    try {
      const result = await postData(base.addPermission, payload);
      console.log(result.data)
      if (result?.data?.status === true) {
        Swal.fire("Success", result.data.message, "success");
        navigate("/user access")
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred during submission", "error");
      console.error("Submission error:", error);
    }
  };
  const selectHandleChange = (selectedItems, index) => {
    setOtherPermission((prev) => {
      const updatedPermissions = [...prev];
      updatedPermissions[index] = {
        ...updatedPermissions[index],
        list: selectedItems.map((item) => item._id), // Extract the value key (e.g., _id) for the list
      };
      return updatedPermissions;
    });
  };



  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-main">
          <div className="page-heading">
            <h2>User Access Management</h2>
          </div>
          <section className="content">
            <div className="user-add-form">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Name: </label>
                    <input
                      type="test"
                      className="form-control"
                      value={userPermission.name}
                      onChange={(e) => setUserPermission((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Email: </label>
                    <input
                      type="email"
                      className="form-control"
                      value={userPermission.email}
                      onChange={(e) => setUserPermission((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Percent Value: </label>
                    <input
                      type="number"
                      min={1} 
                      max={100}
                      className="form-control"
                      value={userPermission.pricePercentage}
                      onChange={(e) => setUserPermission((prev) => ({ ...prev, pricePercentage: e.target.value }))}
                    />
                  </div>
                </div>
               
              </div>
              <div className="row">
                {userProfile.role == "Admin" &&
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No Of Label: </label>
                      <input
                        type="number"
                        className="form-control"
                        value={userPermission.noOfLabel}
                        onChange={(e) => setUserPermission((prev) => ({ ...prev, noOfLabel: e.target.value }))}
                      />
                    </div>
                  </div>
                }
              </div>
              <div className="menu-permission">
                <h2>Menu Permissions</h2>
                <div className="permission-form form-section d-flex flex-wrap">
                  {menuPermission && menuPermission?.map((menu, index) => (
                    <div className="form-inner d-flex align-items-center" key={menu.mainMenuName}>
                      <input type="checkbox" checked={menu.status} onChange={(e) => handleCheckboxChange(e, "menuPermission", index)} />
                      <label>{menu?.mainMenuName}</label>
                      {menu?.submenu.map((submenu, subIndex) => (
                        <label key={submenu.subMenuName} style={{ marginLeft: "20px" }}>
                          <input
                            type="checkbox"
                            checked={submenu.status}
                            onChange={(e) => handleCheckboxChange(e, "menuPermission", index, subIndex)}
                          />
                          {submenu?.subMenuName}
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Catalog Scope */}
              {userProfile?.role == "company" &&
                <div className="catalog-form">
                  <h3 className="title">Catalog Scope</h3>
                  {otherPermission?.map((item, index) => (
                    <div class="form-group">
                      <label for="genre">{item.sectionName}</label>
                      {item.sectionName == "label" &&
                        <SearchableDropdown className="form-control"
                          options={labelNameList}
                          labelKey="title"
                          onChange={(selectedItems) => selectHandleChange(selectedItems, index)}
                        />
                      }
                      {item.sectionName == "artist" &&
                        <SearchableDropdown className="form-control"
                          options={airtestNameList}
                          labelKey="name"
                          onChange={(selectedItems) => selectHandleChange(selectedItems, index)}
                        />
                      }
                      
                    </div>
                  ))}
                </div>
              }
              <button
                onClick={() => [handleSubmit()]}
                className="btn btn-primary"
                type="Submit"
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default UserAccessForm;