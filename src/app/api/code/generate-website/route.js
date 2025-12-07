import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const fullPrompt = `Generate a complete, modern, responsive HTML website based on this description: ${prompt}

Requirements:
- Include inline CSS styling
- Make it responsive
- Use modern design principles
- Include all necessary HTML structure
- Return ONLY the HTML code, no explanations

Generate the complete HTML:`;

    const result = await model.generateContent(fullPrompt);
    const html = result.response.text().replace(/```html|```/g, '').trim();
    
    return NextResponse.json({ html });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
