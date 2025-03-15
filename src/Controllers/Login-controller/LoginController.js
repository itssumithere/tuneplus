import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postData } from "../../Services/Ops";
import { base } from "../../Constants/Data.constant";
import useLocalStorage from "use-local-storage";
import { useUserProfile } from "../../Context/UserProfileContext";


const LoginController = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserProfile ,setUserPermission,getPermissoin} = useUserProfile()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
    let body = {
      email: email,
      password: password,
    };

    let result = await postData(base.login, body);
    console.log("login result==========>",result);
    if (result.data.status === true) {
      setUserProfile(result.data.data)
      localStorage.setItem("token", result.data.data.token)
      localStorage.setItem("userData", result.data.data)
      getPermissoin();
      navigate("/Dashboard");
      
    } else {
      Swal.fire({
        icon: 'error',              // Use "error" icon for unauthorized message
        title: 'Unauthorized !!',    // Set your custom title here
        text: result.message, // Custom message (optional)
      });
      // Swal.fire("Error", result.message, result.message); 
    }
  };

  return {
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
  };
};
export default LoginController;
