"use client"
import { UserDetailContext } from "@/app/_context/userDetaiilContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

function Info() {
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
  
    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-primary">
            Hello, {userDetails?.name}
          </h2>
          <div className="flex items-center gap-2">
            <Image src="/coin.png" alt="coin" width={40} height={40} />
            <h2 className="font-bold text-3xl">{userDetails?.credits}</h2>
          </div>
        </div>
  
        <div className="flex justify-between items-center mt-6">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <Link href={"/create"}>
            <Button>+ Create New Logo</Button>
          </Link>
          
        </div>
      </div>
    );
  }
  
  export default Info;
  