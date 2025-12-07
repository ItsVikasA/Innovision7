import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code, language } = await request.json();

    // For demo purposes, we'll simulate execution
    // In production, use a sandboxed environment like Judge0 API
    
    let output = "";
    
    if (language === "javascript") {
      try {
        // Simple eval for demo (NOT SAFE for production)
        output = eval(code);
      } catch (error) {
        output = `Error: ${error.message}`;
      }
    } else {
      output = `Code execution for ${language} requires external API integration.\nYour code:\n${code}`;
    }

    return NextResponse.json({ output: String(output) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
