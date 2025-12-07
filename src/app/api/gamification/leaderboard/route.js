import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";

export async function GET(request) {
  try {
    const gamificationRef = collection(db, "gamification");
    
    // Get all-time leaderboard
    const allTimeQuery = query(
      gamificationRef,
      orderBy("xp", "desc"),
      limit(50)
    );
    const allTimeSnapshot = await getDocs(allTimeQuery);
    const allTime = allTimeSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get weekly leaderboard (users active in last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyQuery = query(
      gamificationRef,
      where("lastActive", ">=", weekAgo.toISOString()),
      orderBy("lastActive", "desc"),
      orderBy("xp", "desc"),
      limit(50)
    );
    const weeklySnapshot = await getDocs(weeklyQuery);
    const weekly = weeklySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get daily leaderboard (users active today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyQuery = query(
      gamificationRef,
      where("lastActive", ">=", today.toISOString()),
      orderBy("lastActive", "desc"),
      orderBy("xp", "desc"),
      limit(50)
    );
    const dailySnapshot = await getDocs(dailyQuery);
    const daily = dailySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      daily,
      weekly,
      allTime
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
