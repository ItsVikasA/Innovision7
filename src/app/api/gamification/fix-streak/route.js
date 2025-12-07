import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const userRef = doc(db, "gamification", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stats = userDoc.data();
    
    // If streak is 0, set it to 1 (they're using it today)
    if (stats.streak === 0) {
      await updateDoc(userRef, { 
        streak: 1,
        lastActive: new Date().toISOString()
      });
      
      return NextResponse.json({ 
        success: true, 
        message: "Streak fixed to 1",
        newStreak: 1
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Streak already set",
      currentStreak: stats.streak
    });
  } catch (error) {
    console.error("Error fixing streak:", error);
    return NextResponse.json(
      { error: "Failed to fix streak" },
      { status: 500 }
    );
  }
}
