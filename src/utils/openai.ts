import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy requests through your backend
});

export async function getChatbotResponse(message: string, language: string = 'en'): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful customer service representative for Emran Ghani Asahi Printing Company. 
          Respond in ${language}. Keep responses concise and friendly. Focus on printing services, design, 
          and business solutions.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I apologize, but I couldn't process your request.";
  } catch (error) {
    console.error('Error getting OpenAI response:', error);
    throw error;
  }
}