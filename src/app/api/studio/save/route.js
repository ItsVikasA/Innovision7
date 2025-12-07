import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export async function POST(request) {
  try {
    const courseData = await request.json();
    
    if (courseData.id) {
      // Update existing draft
      const docRef = doc(db, "studio_courses", courseData.id);
      await updateDoc(docRef, {
        ...courseData,
        updatedAt: new Date().toISOString()
      });
      
      return NextResponse.json({ 
        success: true, 
        id: courseData.id,
        message: "Draft updated" 
      });
    } else {
      // Create new draft
      const docRef = await addDoc(collection(db, "studio_courses"), {
        ...courseData,
        createdAt: new Date().toISOString()
      });
      
      return NextResponse.json({ 
        success: true, 
        id: docRef.id,
        message: "Draft saved" 
      });
    }
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json(
      { error: "Failed to save draft" },
      { status: 500 }
    );
  }
}
