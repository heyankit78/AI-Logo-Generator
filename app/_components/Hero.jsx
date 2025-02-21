"use client";
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";

const Hero = () => {
  const [logoTitle, setLogoTitle] = useState("");
  const user = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <div className="flex items-center mt-32 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubheading}
      </h2>
      <p className="text-lg text-gray-500 text-center">{Lookup.HeroDesc}</p>

      <div className="flex gap-6 w-full max-w-2xl pt-7">
        <input
          onChange={(e) => setLogoTitle(e.target.value)}
          className="p-3 border rounded-md w-full shadow-md"
          placeholder={Lookup.InputTitlePlaceHolder}
        ></input>

        <SignInButton mode="modal" forceRedirectUrl={currentUrl}>
          {user.isSignedIn ? (
            <Link href={`/create?title=${logoTitle}`}>
              <Button className="p-6">Get Started</Button>
            </Link>
          ) : (
            <Button className="p-6">Get Started</Button>
          )}
        </SignInButton>
      </div>
    </div>
  );
};

export default Hero;
