"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/userDetaiilContext";
import Promt from "../_data/Promt";
import axios from "axios";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GenerateLogo = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");

  // ✅ Load userDetails & formData from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userDetails");
      if (storedUser) setUserDetails(JSON.parse(storedUser));

      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) setFormData(JSON.parse(storedFormData));
    }
  }, []);

  // ✅ Save userDetails to localStorage whenever it updates
  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails]);

  // ✅ Trigger logo generation when formData is ready
  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  // ✅ Generate AI Logo
  const GenerateAILogo = async () => {
    if (!formData) return;

    // Check if user has enough credits
    if (modelType !== "Free" && (!userDetails || userDetails.credits <= 0)) {
      console.log("No Credits Left!");
      toast.error("We are working on it!");
      router.push("/");
      return;
    }

    setLoading(true);

    const PROMPT = Promt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log("Generated Prompt:", PROMPT);
    console.log("User Details:", userDetails);

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        title: formData?.title,
        desc: formData?.desc,
        email: userDetails?.email,
        type: modelType,
        credits: userDetails?.credits,
      });

      console.log("API Response:", result?.data);
      setLogoImage(result?.data?.image);
    } catch (error) {
      console.error("Error generating logo:", error);
      toast.error("Failed to generate logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!logoImage) return;

    const link = document.createElement("a");
    link.href = logoImage;
    link.download = "generated_logo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      )}
      {!loading && logoImage && (
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={logoImage}
            alt="Generated Logo"
            width={400}
            height={400}
          />
          <Button onClick={downloadImage}>Download Image</Button>
          <Link href={"/dashboard"}>
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
