import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await deleteDoc(doc(db, "published_courses", id));
    
    return NextResponse.json({ 
      success: true, 
      message: "Course deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
