import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const docRef = doc(db, "published_courses", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    
    const course = {
      id: docSnap.id,
      ...docSnap.data()
    };
    
    return NextResponse.json({ 
      success: true, 
      course 
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
