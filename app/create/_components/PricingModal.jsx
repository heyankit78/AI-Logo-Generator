import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const PricingModal = ({ formData }) => {
  const user = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  // ✅ Generate full current page URL for redirection after sign-in
  const currentUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {Lookup.pricingOption.map((pricing, index) => (
          <div key={index} className="flex flex-col items-center border rounded-xl">
            <Image src={pricing.icon} alt={pricing.title} width={60} height={60} />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature, index) => (
                <h2 key={index} className="text-lg mt-3">{feature}</h2>
              ))}
            </div>
            {console.log("user------ from pricing", user)}
            {user.isSignedIn ? (
              <Link href={`/generate-logo?type=${pricing.title}`}>
                <Button className="m-5">{pricing.button}</Button>
              </Link>
            ) : (
              <SignInButton mode="modal" forceRedirectUrl={currentUrl}>
                <Button className="m-5" asChild>
                  <span>{pricing.button}</span>
                </Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingModal;
