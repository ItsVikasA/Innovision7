// Personalization API with Reinforcement Learning
import { NextResponse } from "next/server";
import { LearningProfile, calculateReward } from "@/lib/reinforcement-learning";

export async function POST(request) {
  try {
    const { userId, action, type, data } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const profile = new LearningProfile(userId);
    await profile.load();

    let result;

    switch (action) {
      case 'recordInteraction':
        const reward = calculateReward(data.metrics);
        result = await profile.recordInteraction(data.action, reward, data.context);
        break;

      case 'getRecommendation':
        result = profile.getRecommendation(data.context, data.actions);
        break;

      case 'detectLearningStyle':
        result = await profile.detectLearningStyle();
        break;

      case 'getProfile':
        result = profile.state;
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Personalization error:", error);
    return NextResponse.json({ error: "Failed to process personalization" }, { status: 500 });
  }
}
