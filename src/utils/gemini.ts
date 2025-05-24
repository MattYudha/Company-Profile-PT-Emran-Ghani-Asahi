import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Function to delay execution for rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Interface for Gemini API response
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
  error?: {
    code: number;
    message: string;
  };
}

export async function getChatbotResponse(
  message: string,
  language: string = "en",
  retries: number = 3
): Promise<string> {
  const languageMap: { [key: string]: string } = {
    en: "English",
    id: "Indonesian",
    ja: "Japanese",
    zh: "Chinese",
    ar: "Arabic",
  };
  const languageInstruction = languageMap[language] || "English";

  if (!GEMINI_API_KEY) {
    throw new Error(
      "Gemini API key is not configured. Please set the VITE_GEMINI_API_KEY environment variable."
    );
  }

  try {
    console.log(`Sending request to Gemini API: ${new Date().toISOString()}`);

    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a helpful customer service representative for Emran Ghani Asahi Printing Company. 
                Respond in ${languageInstruction} with concise, friendly, and professional answers. 
                Focus on printing services, design, and business solutions. 
                If the query is unrelated, politely redirect to printing-related topics. 
                Keep responses under 150 words.`,
              },
              {
                text: message,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.candidates[0]?.content?.parts[0]?.text;
    if (!reply) {
      return "I apologize, but I couldn’t process your request at the moment. How can I assist you with our printing services?";
    }

    return reply.trim();
  } catch (error: any) {
    console.error("Error getting Gemini response:", error);

    // Handle rate limiting (429)
    if (error.response?.status === 429 && retries > 0) {
      console.log(
        `Rate limit reached, retrying in 1 second (retries left: ${retries})...`
      );
      await delay(1000);
      return getChatbotResponse(message, language, retries - 1);
    }

    // Handle specific error cases
    if (error.response?.status === 400) {
      throw new Error(
        "Invalid request to Gemini API. Please check the input format."
      );
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error(
        "Invalid Gemini API key or insufficient permissions. Please check your API key configuration."
      );
    }
    if (error.response?.status === 429) {
      throw new Error(
        "Too many requests to Gemini API. Please try again later."
      );
    }
    if (error.response?.status === 402) {
      throw new Error(
        "Gemini API payment required. Please check your account status and billing information at https://ai.google.dev/."
      );
    }

    throw new Error(
      "Sorry, there was an error connecting to the Gemini AI server. Please try again later."
    );
  }
}
