import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getData, postData, postDataContent } from "../../Services/Ops"; // Adjust the path to your service
import { base } from "../../Constants/Data.constant";

const useProfileController = () => {
  // State for managing form inputs
  const [profile, setProfile] = useState({
    companyName: "",
    clientNumber: "",
    mainEmail: "",
    royaltiesEmail: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postalAddress: "",
    postalCode: "",
    city: "",
    country: "", // Default value
    timeZone: "",
    language: "", // Default value
  });
  useEffect(() => {
    getProfile();
  }, []);


  const getProfile = async () => {
    try {
      // const userId = "671e08391a2071afe4269f80";
      const result = await getData(base.userProfile); // pass as query parameter
      // console.log(result)
      if (result && result.status === true) {
        setProfile({
          companyName: result.data.companyName,
          clientNumber: result.data.clientNumber,
          mainEmail: result.data.mainEmail,
          royaltiesEmail: result.data.royaltiesEmail,
          firstName: result.data.name,
          lastName: result.data.lastName,
          phoneNumber: result.data.phoneNumber,
          postalAddress: result.data.postalAddress,
          postalCode: result.data.postalCode,
          city: result.data.city,
          country: result.data.country, // Default value
          timeZone: result.data.timeZone,
          language: result.data.language, // Default value
        })
      } else {
        Swal.fire({
          icon: 'error', // Use "error" icon for unauthorized message
          title: 'Unauthorized !!', // Set your custom title here
          text: 'You do not have permission to access this resource.' // Custom message (optional)
        });
        // Uncomment if you want to redirect:
        // navigate("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.'
      });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("--------------", profile)
      const result = await postData(base.updateProfile, profile); // Adjust endpoint
      console.log("Server Response:", result);

      if (result.data.status === true) {

        Swal.fire("Success", result.data.message, "success");
      } else {
        Swal.fire("Error", result.data.message, "error");
      }
    } catch (error) {
      console.error("Error Submitting form:", error);
      Swal.fire("Error", "Something went wrong. Please try again later.", "error");
    }
  };

  return {
    profile,
    handleChange,
    handleSubmit,
  };
};

export default useProfileController;
