import { NextResponse } from "next/server";
import { auth } from "@/app/auth";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* -------------------------------
   Initialize Gemini Client
--------------------------------*/
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

/* -------------------------------
   Database Updating with Retry
--------------------------------*/
async function updateDatabase(details, id, user, retries = 3) {
  const docRef = doc(db, "users", user.email, "roadmaps", id);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await setDoc(docRef, details, { merge: true });
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) throw new Error("Database update failed");
      await new Promise((res) => setTimeout(res, 1000 * attempt));
    }
  }
}

/* -------------------------------
   Clean JSON Parsing
--------------------------------*/
function parseJson(response) {
  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("JSON parse error:", err);
    return { error: true };
  }
}

/* -------------------------------
   Gemini Prompt Generation
--------------------------------*/
async function generateRoadmap(prompt, id, session, user_prompt) {
  try {
    const geminiResponse = await model.generateContent(`
SYSTEM:
Act as a structured roadmap generator. Create a chapter-wise learning path for [CONCEPT] with these exact rules:
1. Strictly return VALID JSON (no markdown, no backticks).
2. Use camelCase keys.
3. Must include:
   - courseTitle
   - courseDescription
   - chapters[] → each containing:
     - chapterNumber (integer)
     - chapterTitle
     - chapterDescription (1 sentence)
     - learningObjectives[]
     - contentOutline[]
4. Learning objectives MUST start with action verbs (Analyze, Compare, Implement, etc.)
5. Logical progression: basic → advanced.

USER:
${prompt}
    `);

    const text = geminiResponse.response.text();
    const parsedResponse = parseJson(text);

    if (parsedResponse.error) {
      await updateDatabase(
        {
          message: "The provided concept is unsuitable for forming a course.",
          process: "unsuitable",
        },
        id,
        session.user
      );
      return;
    }

    const difficulty =
      user_prompt.difficulty === "in-depth"
        ? "inDepth"
        : user_prompt.difficulty;

    await updateDoc(doc(db, "users", session.user.email), {
      [`roadmapLevel.${difficulty}`]: increment(1),
    });

    await updateDatabase(
      {
        ...parsedResponse,
        createdAt: Date.now(),
        difficulty,
        process: "completed",
      },
      id,
      session.user
    );
  } catch (error) {
    console.error("Error generating roadmap:", error);

    await updateDatabase(
      {
        message: "There was an error while generating your roadmap.",
        process: "error",
      },
      id,
      session.user
    );
  }
}

/* -------------------------------
   Check Eligibility
--------------------------------*/
async function checkEligible(session) {
  try {
    const q = query(
      collection(db, "users", session.user.email, "roadmaps"),
      where("process", "==", "completed")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size <= 6;
  } catch (error) {
    console.error("Eligibility check failed:", error);
    return false;
  }
}

/* -------------------------------
   POST Handler
--------------------------------*/
export async function POST(req) {
  const user_prompt = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  if (user_prompt?.prompt.length > 800) {
    return NextResponse.json(
      { message: "The given prompt is beyond maximum character length." },
      { status: 400 }
    );
  }

  try {
    const roadmapId = nanoid(20);

    await updateDatabase({ process: "pending" }, roadmapId, session.user);

    // background processing
    setTimeout(
      () =>
        generateRoadmap(user_prompt.prompt, roadmapId, session, user_prompt),
      0
    );

    const isEligible = await checkEligible(session);
    if (!isEligible) {
      return NextResponse.json(
        { message: "Max limit reached" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { process: "pending", id: roadmapId },
      { status: 202 }
    );
  } catch (error) {
    console.error("Internal error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
