import React from 'react'
import useChangePasswordController from '../../Controllers/Change-Password/useChangePasswordController'
import { Nav } from '../Common/Nav'
import { SideBar } from '../Common/SideBar'
export default function Password() {
const { newPassword,
setNewPassword,
oldPassword, setOldPassword,
handleSubmit,
} = useChangePasswordController();
return (
<div>
  <SideBar/>
  <div className="main-cotent">
    <Nav />
    <div className="content-main">
      <section className="page-heading">
        <h1>Password</h1>
      </section>
      <section className="password-change">
        <div className="dash-detail dash-detail-two">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-group-text" id="old-password-addon">
              Old Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter old password"
                aria-label="Old Password"
                aria-describedby="old-password-addon"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} // Update state on input change
              required
              />
            </div>
            <div className="form-group">
              <label className="form-group-text" id="new-password-addon">
              New Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                aria-label="New Password"
                aria-describedby="new-password-addon"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update state on input change
              required
              />
            </div>
            <button type="Submit" className="btn btn-primary">
            Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</div>
)
}