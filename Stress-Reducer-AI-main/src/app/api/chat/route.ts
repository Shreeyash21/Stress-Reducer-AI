import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Aria, an empathetic and intelligent AI mental wellness companion for Stress Reducer AI. Your role is to:

1. Provide emotional support and active listening
2. Help users identify and manage stress, anxiety, and negative emotions
3. Offer evidence-based coping strategies (CBT techniques, mindfulness, breathing exercises)
4. Guide users through relaxation and meditation exercises
5. Provide motivational support and encouragement
6. Suggest wellness activities appropriate to the user's current emotional state
7. Detect emotional distress and respond with appropriate care and resources

Guidelines:
- Always respond with warmth, empathy, and non-judgment
- Use a calm, supportive tone that feels like talking to a caring friend
- Keep responses concise but meaningful (2-4 paragraphs max)
- Ask follow-up questions to better understand the user's situation
- If someone expresses thoughts of self-harm, immediately provide crisis resources
- Never diagnose medical conditions or replace professional therapy
- Celebrate small wins and progress
- Use the user's name when known

Crisis Resources (always provide if needed):
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency: 911

Remember: You are a supportive companion, not a replacement for professional mental health care.`;

function detectEmotion(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/happy|great|wonderful|amazing|excited|joy|love|fantastic/)) return "happy";
  if (lower.match(/calm|peaceful|relaxed|serene|tranquil|okay/)) return "calm";
  if (lower.match(/anxious|anxiety|worried|nervous|panic|stress|overwhelm/)) return "anxious";
  if (lower.match(/sad|depressed|down|unhappy|miserable|cry|hopeless/)) return "sad";
  if (lower.match(/angry|frustrated|mad|furious|irritated|annoyed/)) return "angry";
  if (lower.match(/excited|thrilled|enthusiastic|energetic/)) return "excited";
  if (lower.match(/tired|exhausted|fatigue|sleepy|drained/)) return "tired";
  return "neutral";
}

export async function POST(request: NextRequest) {
  try {
    const { message, context = [] } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const emotion = detectEmotion(message);

    // Build messages array
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...context.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Check if OpenAI key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_api_key") {
      // Return a demo response
      const demoResponses: Record<string, string> = {
        anxious: "I can hear that you're feeling anxious right now, and I want you to know that's completely valid. Anxiety is your mind's way of trying to protect you, even when it feels overwhelming.\n\nLet's try something together: Take a slow, deep breath in for 4 counts, hold for 4, then exhale for 6. This activates your parasympathetic nervous system and can help calm those anxious feelings.\n\nWhat's been on your mind lately? Sometimes just talking through what's causing the anxiety can help us see it more clearly. 💙",
        sad: "I'm really glad you reached out. It takes courage to acknowledge when we're feeling sad, and I want you to know you don't have to face this alone.\n\nSadness is a natural human emotion, and it's okay to sit with it for a moment. Sometimes our feelings are trying to tell us something important.\n\nWould you like to share what's been weighing on your heart? I'm here to listen without judgment. 🌸",
        happy: "That's wonderful to hear! It's so important to acknowledge and celebrate the good moments in life. Your positive energy is truly uplifting! 🌟\n\nHappiness has a beautiful ripple effect - when we feel good, we tend to make better decisions and connect more deeply with others.\n\nWhat's been bringing you joy lately? I'd love to hear more about what's going well in your life!",
        neutral: "Thank you for checking in with me today. I'm here to support you on your wellness journey, whatever you're going through.\n\nHow has your day been treating you? Sometimes the most important thing is just having a space to reflect and be heard.\n\nIs there anything specific on your mind, or would you like to explore some wellness practices together? 🌿",
      };

      const response = demoResponses[emotion] || demoResponses.neutral;

      return NextResponse.json({
        message: response,
        emotion_detected: emotion,
        suggestions: [
          "Try a 5-minute breathing exercise",
          "Write in your wellness journal",
          "Take a short mindful walk",
        ],
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.8,
      presence_penalty: 0.3,
      frequency_penalty: 0.3,
    });

    const aiMessage = completion.choices[0]?.message?.content || "I'm here for you. Could you tell me more about how you're feeling?";

    return NextResponse.json({
      message: aiMessage,
      emotion_detected: emotion,
      suggestions: [
        "Try a breathing exercise",
        "Write in your journal",
        "Practice mindfulness",
      ],
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        message: "I'm experiencing a brief moment of reflection. Please try again in a moment. Remember, I'm always here for you. 💙",
        emotion_detected: "neutral",
      },
      { status: 200 }
    );
  }
}
