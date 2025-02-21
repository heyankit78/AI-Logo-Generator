import { AILogoPromt } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import axios from "axios";
import Replicate from "replicate";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const { prompt, title, desc, email, type, credits } = await req.json();

    // Validate email
    if (!email || typeof email !== "string") {
      console.error("❌ Invalid email:", email);
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Generate AI Text Prompt for Logo
    const AiPromptResult = await AILogoPromt.sendMessage(prompt);
    const AIPrompt = AiPromptResult.response.text();
    console.log("🛠️ AIPrompt:", AIPrompt);

    let base64ImageWithMime = "";

    if (type === "Free") {
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix-LoRA",
        { inputs: AIPrompt },
        {
          headers: {
            Authorization: "Bearer " + process.env.HF_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      const buffer = Buffer.from(response.data, "binary");
      const base64Image = buffer.toString("base64");
      base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    } else {
      try {
        const replicate = new Replicate({
          auth: process.env.REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
          "bytedance/hyper-flux-8step:81946b1e09b256c543b35f37333a30d0d02ee2cd8c4f77cd915873a1ca622bad",
          {
            input: {
              prompt: AIPrompt,
              num_outputs: 1,
              aspect_ratio: "1:1",
              output_format: "png",
              guidance_scale: 3.5,
              output_quality: 80,
              num_inference_steps: 8,
            },
          }
        );
        base64ImageWithMime = await convertImageToBase64(output[0]);
      } catch (e) {
        return NextResponse.json({ error: "It is paid" }, { status: 500 });
      }
    }

    try {
      const logoId = Date.now().toString();
      const userRef = doc(db, "users", email);

      // Check if the user already exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        await updateDoc(userRef, {
          logos: arrayUnion({
            logoId: logoId,
            image: base64ImageWithMime,
            title: title,
            desc: desc,
          }),
        });
      } else {
        await setDoc(userRef, {
          email: email,
          name: "Unknown", // You can change this if you collect user names
          credits: 5, // Default credits, if needed
          logos: [
            {
              logoId: logoId,
              image: base64ImageWithMime,
              title: title,
              desc: desc,
            },
          ],
        });
      }

      console.log("✅ Logo saved successfully!");
    } catch (firestoreError) {
      console.error("❌ Firestore Error:", firestoreError.message);
      return NextResponse.json(
        { error: "Failed to save logo", details: firestoreError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (e) {
    revalidatePath("/create");
    console.error("❌ Error:", e.response?.data || e.message);
    return NextResponse.json(
      { error: "Something went wrong", details: e.response?.data || e.message },
      { status: 500 }
    );
  }
}

export async function convertImageToBase64(image) {
  const response = await axios.get(image, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(response.data).toString("base64");
  return `data:image/png;base64,${base64ImageRaw}`;
}
