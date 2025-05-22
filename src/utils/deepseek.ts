import axios from 'axios';

const DEEPSEEK_API_KEY = 'sk-3592566451454be68fca030269ef92d5';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    ar: "Arabic"
  };
  const languageInstruction = languageMap[language] || "English";

  try {
    console.log(`Sending request to DeepSeek: ${new Date().toISOString()}`);
    
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        messages: [
          {
            role: "system",
            content: `You are a helpful customer service representative for Emran Ghani Asahi Printing Company. 
            Respond in ${languageInstruction} with concise, friendly, and professional answers. 
            Focus on printing services, design, and business solutions.`
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "deepseek-chat",
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0]?.message?.content || 
      "I apologize, but I couldn't process your request at the moment.";

  } catch (error: any) {
    console.error("Error getting DeepSeek response:", error);

    // Handle rate limiting
    if (error.response?.status === 429 && retries > 0) {
      console.log(`Rate limit reached, retrying in 1 second (retries left: ${retries})...`);
      await delay(1000);
      return getChatbotResponse(message, language, retries - 1);
    }

    // Throw specific error messages
    if (error.response?.status === 429) {
      throw new Error("429: Too many requests. Please try again later.");
    }
    throw new Error("Sorry, there was an error connecting to the AI server.");
  }
}