import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { score_response, user_message } = body;

    let context = "";
    if (score_response) {
      context = `Context: The current claim has a risk score of ${score_response.risk_score_100 || 0}/100 and has flags: ${(score_response.explanation || []).join(", ")}.`;
    }

    const full_prompt = `${context}\nUser: ${user_message}\nExplain the investigative steps for this specific fraud pattern.`;

    const sarvamKey = process.env.SARVAM_API_KEY;
    
    if (!sarvamKey) {
      return NextResponse.json({ reply: "Analysis engine offline. Please check SARVAM_API_KEY in your Vercel environment variables." });
    }

    const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Subscription-Key": sarvamKey
      },
      body: JSON.stringify({
        model: "sarvam-30b",
        messages: [{ role: "user", content: full_prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Sarvam API Error:", errText);
      return NextResponse.json({ reply: "Sarvam API request failed. Please verify API key permissions." }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Chat Server Error:", error);
    return NextResponse.json({ reply: "An internal server error occurred while connecting to AI." }, { status: 500 });
  }
}
