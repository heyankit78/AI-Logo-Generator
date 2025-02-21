"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
// import { db } from "../firebaseConfig"; // Ensure correct Firebase configuration

const LogoList = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLogos = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        let allLogos = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.logos && Array.isArray(userData.logos)) {
            allLogos = [...allLogos, ...userData.logos];
          }
        });

        setLogos(allLogos);
      } catch (error) {
        console.error("Error fetching logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLogos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Logos</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {logos.length > 0 ? (
            logos.map((logo, index) => (
              <div key={index} className="">
                <img
                  src={logo.image}
                  alt={logo.title}
                  className="w-37 h-37 object-contain mx-auto"
                />
              </div>
            ))
          ) : (
            <p>No logos found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoList;
