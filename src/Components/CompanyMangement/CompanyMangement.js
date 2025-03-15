import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { base } from "../../Constants/Data.constant";
import { getData, postData } from "../../Services/Ops";
import { Nav } from "../Common/Nav";
import "./styles.css";
import { Box, Button, Modal, Typography } from '@mui/material';
import DataTable from "../Common/DataTable/DataTable";
import { SideBar } from "../Common/SideBar";

const CompanyManagement = (props) => {
  const [search, setSearch] = useState("");
  const [accountStatus, setAccountStatus] = useState("All");
  const [permissionLevel, setPermissionLevel] = useState("All");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (login) => {
    setUsers(users.filter((user) => user.login !== login));
  };


  useEffect(() => {
    getUserList();
  }, [props])
  const getUserList = async () => {
    let result = await getData(base.userList);
    console.log("my user list=========>", result.data)
    const resultList = Array.isArray(result.data)
      ? result.data
        // .filter((item) => item.status === 'Pending') // Filter items with status 'Pending'
        .map((item, index) => ({
          _id: item._id,
          clientNumber: item.clientNumber,
          id: index + 1,
          name: item.name,
          email: item.email,
          wallet: item.wallet,
          status: item.is_deleted == 0 ? "Active" : "DeActive",
          action: "",
        }))
      : [];
    setUsers(resultList)
  }
  const user_delete = async (userId, status) => {

    try {
      let body = {
        "userId": userId,
        "status": status == "DeActive" ? 0 : 1
      }
      let result = await postData(base.deleteUser, body)
      if (result.data.status === true) {
        Swal.fire("Success", result.data.message, "success");
        getUserList();
      } else {
        Swal.fire("Error", result.data.message, "error");
      }
    } catch (error) {
      console.error("Error Submitting form:", error);
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    }
  }

  const onDetails = (id) => {
    navigate("/UserDetails", { state: { userId: id } });
  }


  const columns = [
    { field: 'id', headerName: '#', headerClassName: 'black-header', width: 50 },
    { field: 'clientNumber', headerName: 'Client Number', headerClassName: 'black-header', width: 250 },
    { field: 'name', headerName: 'Name', headerClassName: 'black-header', width: 100 },
    { field: 'email', headerName: 'EMAIL', headerClassName: 'black-header', width: 200 },
    { field: 'wallet', headerName: 'WALLET', headerClassName: 'black-header', width: 60 },
    { field: 'status', headerName: 'STATUS', headerClassName: 'black-header', width: 200 },
    {
      field: 'action', headerName: 'ACTION', width: 300,
      renderCell: (params) => (
        <div style={{ gap: '8px', display: 'flex', padding: 10 }}>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              user_delete(params.row._id, params.row.status);
            }}
          >
            {params.row.status == "DeActive" ? "Active" : "DeActive"}
          </Button>
          <Button
            variant="contained"
            color="secondary" // Corrected the color to "secondary"
            size="small"
            onClick={() => {
              navigate("/CompanyDetails", { state: { userId: params.row._id } });

            }}
          >
            View
          </Button>
        </div>

      )
    }
  ];
  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-main">
          <div className="page-heading">
            <div className='row'>
              <div className="track-heading d-flex flex-wrap align-items-center justify-content-between">
                <h2>User Management</h2>
                <div className="add-track-btn">
                  <a href="AddCompany"> <button className="btn btn-primary ">Add Master Account</button></a>
                </div>
              </div>
            </div>
          </div>
          <div className="content-wrapper">

            <section className="content">

              <div className="content">

                <DataTable
                  columns={columns}
                  rows={users}
                  height="500"
                  width="100%"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CompanyManagement;
