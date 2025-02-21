"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Header = () => {
  const user = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Link href={"/"}>
        <img src={"/logo.svg"} alt="logo" width={180} height={100} />
      </Link>

      <div className="flex gap-3 items-center">
        {user.isSignedIn && (
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
        )}

        <SignInButton mode="modal" forceRedirectUrl={currentUrl}>
          {user.isSignedIn ? (
            <div className="flex gap-3 items-center">
              {/* <Link href={`/create`}>
                <Button className="">Get Started</Button>
              </Link> */}
            </div>
          ) : (
            <Link href={`/create`}>
            <Button className="">Get Started</Button>
            </Link>
          )}
        </SignInButton>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
