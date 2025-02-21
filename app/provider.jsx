"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "./_context/userDetaiilContext";

const Provider = ({ children }) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [userDetails,setUserDetails] = useState()

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            checkUserAuth(user);
        }
    }, [isLoaded, isSignedIn]);

    const checkUserAuth = async (user) => {
        console.log("User data:", user);
        if (!user) return;

        try {
            const result = await axios.post("/api/users", {
                userName: user.fullName,
                userEmail: user.emailAddresses[0]?.emailAddress,
            });

            console.log("User saved in Firestore:", result.data);
            setUserDetails(result.data);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div>
        <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
            <Header />
            <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4">
                {children}
            </div>
        </UserDetailContext.Provider>
        </div>
        
    );
};

export default Provider;
