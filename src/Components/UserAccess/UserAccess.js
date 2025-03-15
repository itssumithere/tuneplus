import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { base } from "../../Constants/Data.constant";
import { useUserProfile } from "../../Context/UserProfileContext";
import { getData, postData } from "../../Services/Ops";
import { Nav } from "../Common/Nav";
import { SideBar } from '../Common/SideBar'
import "./styles.css";
const UserAccess = (props) => {
  const { userProfile } = useUserProfile()
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
    let result = await getData(base.getUserList);
    console.log("my user list=========>", result.data)
    setUsers(result.data)
  }

  const deleteAction = async (userid) => {
      let body={
        id : userid 
      }
      console.log(body)
      let result = await postData(base. deleteUserparmanent, body);
      if (result.data.status === true) {
        Swal.fire("Success", result.message , result.message) 
        getUserList();
        let updateArr= users.filter(item=> item._id !== userid)
        setUsers(updateArr)
  
      } else {
        Swal.fire("Error", result.message, result.message);
      }
      
    }
  const user_delete = async (userId, status) => {
    try {
      let body = {
        "userId": userId,
        status: status == 1 ? 0 : 1
      }
      let result = await postData(base.deleteUser, body)
      if (result.data.status === true) {
        Swal.fire("Success", result.data.message, "success");
        getUserList();
      } else {
        Swal.fire("Error", result.data.message, "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    }
  }
  return (
    <div>
      <SideBar />
      <div className="main-cotent">
        <Nav />
        <div className="content-main">
          <div className="page-heading d-flex flex-wrap align-items-center justify-content-between">
            <h1>User Management</h1>
            <a className="btn btn-primary" href="add-user">Add a new user</a>
          </div>
          <p className="content" style={{ fontSize: "16px", color: "#333", lineHeight: "1.5", marginTop: "10px" }}>
              ** As an administrator, you're in control of your team's TunePlus access. Easily create new user
              accounts, tailoring their experience by specifying their catalog scope, permission level, and
              access to specific TunePlus sections. Once you've configured their settings, they'll automatically
              receive an email with their login details and be ready to go. **
            </p>
          <section className="content">
            {/* Filters */}
            {/* User List */}
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Client Number</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users?.map((user) => (
                  <tr key={user?.userDetails?._id}>
                    <td>{user?.userDetails?.name}</td>
                    <td>{user?.userDetails?.clientNumber}</td>

                    <td>{user?.userDetails?.email}</td>
                    <td>{user?.userDetails?.is_deleted == 1 ? "DeActive" : "Active"}</td>
                    <td>
                      <button
                        className={user?.userDetails?.is_deleted == 0 ? "action-button delete" : "btn btn-primary"}
                        onClick={() => {
                          user_delete(user?.userDetails?._id, user?.userDetails?.is_deleted);
                        }}
                      >
                        {user?.userDetails?.is_deleted == 0 ? "DeActive" : "Active"}
                      </button>
                      <button className="btn btn-primary" onClick={() => { navigate("/edit-permission", { state: { userData: user } }); }}>Edit</button>
                      { <button title='Download' className='action-button'>
                        <a onClick={async () => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: `You want to delete ${user?.userDetails?.name} `,
                            icon: "warning", // Options: 'warning', 'error', 'success', 'info', 'question'
                            showCancelButton: true, // Enables the Cancel button
                            confirmButtonText: "Yes, proceed",
                            cancelButtonText: "No, cancel",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // User clicked the confirm button
                              deleteAction(user?.userDetails?._id)
                            } else if (result.isDismissed) {
                              // User clicked the cancel button
                              Swal.fire("Cancelled", "Action was cancelled.", "info");
                            }
                          });
                        }
                        }>
                          <i className='fa fa-trash'></i>
                        </a>
                      </button> }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};
export default UserAccess;