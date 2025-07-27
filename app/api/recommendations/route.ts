import { NextResponse } from 'next/server';  // Use NextResponse for Next.js APIs
import OpenAI from 'openai';
export const dynamic = 'force-dynamic';  // Ensures this route is dynamic

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function predictEncryption(encryptedText: string) {
  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encryptedText }),
  });

  const data = await res.json();
  return data.prediction;
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { fileType, computationalPower, securityLevel, realTime, crossPlatform } = body;

    if (!fileType || !computationalPower || !securityLevel) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert in encryption algorithms. Provide a list of the best encryption algorithms based on the given requirements. Return only the names of the algorithms as a bullet point list, maximum 5 algorithms.',
        },
        {
          role: 'user',
          content: `Recommend encryption algorithms for:
            - File type: ${fileType}
            - Computational power: ${computationalPower}
            - Security level: ${securityLevel}
            - Real-time processing needed: ${realTime}
            - Cross-platform compatibility needed: ${crossPlatform}`,
        },
      ],
      temperature: 0.7,
    });

    if (!completion.choices[0]?.message?.content) {
      return NextResponse.json(
        { error: 'No recommendations received' },
        { status: 500 }
      );
    }

    const recommendations = completion.choices[0].message.content
      .split("\n")
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);

    return NextResponse.json(recommendations);

  } catch (error:any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred during your request.',
        details: error.message
      },
      { status: 500 }
    );
  }
}
