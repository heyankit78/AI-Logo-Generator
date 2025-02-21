import { db } from "@/configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userEmail, userName } = await req.json();

        if (!userEmail || !userName) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data());
        } else {
            const data = {
                name: userName,
                email: userEmail,
                credits: 5
            };

            await setDoc(docRef, data);
            return NextResponse.json(data);
        }
    } catch (error) {
        console.error("Error saving to Firestore:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
