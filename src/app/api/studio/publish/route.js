import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const courseData = await request.json();
    
    // Save to published courses collection
    const docRef = await addDoc(collection(db, "published_courses"), {
      ...courseData,
      status: "published",
      publishedAt: new Date().toISOString()
    });
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "Course published successfully" 
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    return NextResponse.json(
      { error: "Failed to publish course" },
      { status: 500 }
    );
  }
}
