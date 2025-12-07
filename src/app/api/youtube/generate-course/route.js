import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { title, summary, transcript } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create a detailed course from this YouTube video:

Title: ${title}
Summary: ${JSON.stringify(summary)}
Transcript: ${transcript}

Generate a complete course with chapters, each containing:
- Title
- Description
- Key concepts
- Exercises

Return as JSON matching this structure:
{
  "title": "Course Title",
  "description": "Course description",
  "chapters": [
    {
      "title": "Chapter 1",
      "description": "Chapter description",
      "content": "Detailed content",
      "exercises": ["Exercise 1", "Exercise 2"]
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const courseData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    
    if (!courseData) {
      throw new Error("Failed to generate course");
    }

    // Save to Firebase
    const docRef = await addDoc(collection(db, "roadmaps"), {
      ...courseData,
      source: "youtube",
      createdAt: new Date().toISOString(),
      process: "completed"
    });

    return NextResponse.json({ id: docRef.id, ...courseData });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
