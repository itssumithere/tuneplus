import React from 'react';
import { useUserProfile } from '../../Context/UserProfileContext';
import useProfileController from '../../Controllers/Profile-Controller/useProfileController';
import { Nav } from '../Common/Nav';
import { SideBar } from '../Common/SideBar'
export default function Profile() {
const {userProfile}= useUserProfile()
const { profile, handleChange, handleSubmit } = useProfileController();
return (
<div>
  <SideBar/>
  <div className="main-cotent">
    <Nav />
    <div className="content-main">
      <section className="page-heading">
        <h1>Profile</h1>
      </section>
      <section className="content">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="dash-detail dash-detail-two">
            <div className="row">
              {userProfile?.role == "company" &&
              <>
              {/* Company Name */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label for="exampleInputEmail1">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter company name"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Client Number */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Client Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter client number"
                    name="clientNumber"
                    value={profile.clientNumber}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Main Email */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Main Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter main email address"
                    name="mainEmail"
                    value={profile.mainEmail}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Royalties Email */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Royalties Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter royalties email address"
                    name="royaltiesEmail"
                    value={profile.royaltiesEmail}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              </>
              }
              {/* First Name */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Last Name */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Phone Number */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Postal Address */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Postal Address</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter postal address"
                    name="postalAddress"
                    value={profile.postalAddress}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Postal Code */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter postal code"
                    name="postalCode"
                    value={profile.postalCode}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* City */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Country */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter country"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Time Zone */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Default Time Zone</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter default time zone"
                    name="timeZone"
                    value={profile.timeZone}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Language */}
              <div className="col-lg-3 col-md-4 col-12">
                <div className="form-group">
                  <label >Default Language</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter default language"
                    name="language"
                    value={profile.language}
                    onChange={handleChange}
                    required
                    />
                </div>
              </div>
              {/* Submit Button */}
              {/* <div className="Submit-btn">
                <button type="Submit" className="btn btn-primary">Update Profile</button>
              </div> */}
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</div>
);
}