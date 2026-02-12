import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Sara, a warm, friendly, and enthusiastic travel assistant for TripMatch. You LOVE helping people plan trips and finding the perfect hotel. Your personality traits:
- Super friendly, uses emojis naturally (not excessively)
- Genuinely excited about travel destinations
- Encouraging and supportive
- Conversational and natural, like chatting with a knowledgeable friend
- Keep responses concise (2-4 sentences max)

IMPORTANT RULES:
- You are collecting travel preferences step by step
- Each response should acknowledge what the user said and transition to the next question
- Stay on topic — you're a hotel search assistant
- Never make up hotel names or prices
- If the user enters gibberish or nonsense, kindly ask them to provide a valid answer
- Always end with the next question clearly marked with 👉`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { step, userInput, searchParams } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build contextual prompt based on the current step
    let stepPrompt = "";
    switch (step) {
      case "greeting":
        stepPrompt =
          "Introduce yourself as Sara from TripMatch. Welcome the user warmly and ask which city they are traveling FROM. Give examples like New York, London, Mumbai.";
        break;
      case "ask-from":
        stepPrompt = `The user said their departure city is "${userInput}". Acknowledge it warmly and ask which city they want to TRAVEL TO (their destination). Give examples like Paris, Tokyo, Dubai.`;
        break;
      case "ask-to":
        stepPrompt = `The user wants to travel to "${userInput}" from "${searchParams?.from}". React excitedly about their destination choice and ask for their CHECK-IN date. Give format examples like March 15, 2025 or 15/03/2025.`;
        break;
      case "ask-checkin":
        stepPrompt = `The user's check-in date is "${userInput}". Confirm it and ask for their CHECK-OUT date. Give format examples.`;
        break;
      case "ask-checkout":
        stepPrompt = `The user's check-out date is "${userInput}". Confirm it and ask how many GUESTS will be staying (number between 1-20, include yourself).`;
        break;
      case "ask-guests":
        stepPrompt = `The user said ${userInput} guest(s). React appropriately (solo trip, couple, group) and tell them you'll now ask about their preferences. Ask about their PRICE RANGE per night. Mention they'll see buttons for: Budget ($0-$100), Mid-Range ($100-$250), Luxury ($250+). Tell them to pick one below.`;
        break;
      case "ask-price":
        stepPrompt = `The user selected "${userInput}" as their budget tier. React to their choice and ask about their preferred STAR RATING. Mention they'll see buttons for: 3-Star, 4-Star, 5-Star, or 4 & 5 Star. Tell them to pick one below.`;
        break;
      case "ask-stars":
        stepPrompt = `The user selected ${userInput}-star hotels. React and ask how many ROOMS they need (number between 1-20).`;
        break;
      case "ask-rooms":
        stepPrompt = `The user needs ${userInput} room(s). Confirm and ask about preferred HOTEL LOCATION. Mention they'll see buttons for: City Center, Near Airport, Tourist Area, Suburban. Tell them to pick one below.`;
        break;
      case "ask-location":
        stepPrompt = `The user selected "${userInput}" as their preferred location. React and ask which AMENITIES are important. This is the LAST question! Mention they'll see buttons for: WiFi, Pool, Gym, Spa. Tell them to pick one or more below.`;
        break;
      case "ask-amenities":
        stepPrompt = `The user selected amenities: "${userInput}". This was the last question! Express excitement that you have everything you need. Tell them to sit tight while you search through the worldwide hotel database. Make it sound exciting!`;
        break;
      case "results-full":
        stepPrompt = `You found hotels that match ALL of the user's criteria perfectly! Express genuine excitement. Tell them to check out their perfect matches below.`;
        break;
      case "results-partial":
        stepPrompt = `You searched hard but couldn't find hotels matching ALL criteria. Be honest but positive — the options you found are still great! Encourage them to look at what you've got.`;
        break;
      case "decision":
        stepPrompt = `Ask the user what they think of the hotel results. Do they want to PROCEED with booking or DISCARD and try a different search? Be supportive either way.`;
        break;
      case "proceed":
        stepPrompt = `The user chose to PROCEED! Celebrate! Tell them their response has been recorded. Thank them for using TripMatch and wish them an incredible trip.`;
        break;
      case "discard":
        stepPrompt = `The user chose to DISCARD. Be understanding and supportive. Tell them their feedback has been recorded. Encourage them to come back anytime.`;
        break;
      case "validation-error":
        stepPrompt = `The user entered invalid input: "${userInput}". Kindly point out it doesn't seem right and ask them to try again with a valid answer. Be gentle and helpful, not robotic.`;
        break;
      default:
        stepPrompt = `Respond naturally to: "${userInput}"`;
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: stepPrompt },
          ],
          max_tokens: 300,
          temperature: 0.8,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "I'm having trouble responding right now. Please try again!";

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("sara-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
