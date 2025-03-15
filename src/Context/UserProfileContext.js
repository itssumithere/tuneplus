// UserProfileContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { base } from '../Constants/Data.constant';
import { getData } from '../Services/Ops';

// Create the context
const UserProfileContext = createContext();

// Create a provider component
export const UserProfileProvider =  ({ children }) => {
    const [userProfile, setUserProfile] = useState({});

    const [userPermission, setUserPermission] = useState([]);

    useEffect(() => {
        getProfile();
        getPermissoin();
        console.log("userProfileuserProfile=========",userProfile)
    }, []);
    const getPermissoin = async () => {
        try {
            // console.log("tokentokentokentokentoken",token)
            const result = await getData(base.myPermission); // pass as query parameter
            console.log(result)
            if (result && result.status === true) {
                setUserPermission(result.data); // Assuming result.data has user data directly
            }

        } catch (error) { 
        }
    };


    const getProfile = async () => {
        try {
            const result = await getData(base.userProfile); // pass as query parameter
            console.log(result)
            if (result && result.status === true) {
                setUserProfile(result.data); // Assuming result.data has user data directly
            }
        } catch (error) {
        }
    };
    return (
        <UserProfileContext.Provider value={{ userProfile, userPermission, setUserProfile,getPermissoin,getProfile }}>
            {children}
        </UserProfileContext.Provider>
    );
};

// Custom hook for using UserProfileContext
export const useUserProfile = () => {
    return useContext(UserProfileContext);
};
