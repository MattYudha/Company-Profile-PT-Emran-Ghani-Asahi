import OpenAI from "openai";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, proxy requests through a backend to secure the API key
});

// Fungsi untuk menunda eksekusi
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getChatbotResponse(
  message: string,
  language: string = "en",
  retries: number = 3
): Promise<string> {
  // Map kode bahasa ke instruksi bahasa yang jelas
  const languageMap: { [key: string]: string } = {
    en: "English",
    id: "Indonesian",
    // Tambahkan bahasa lain jika diperlukan
  };
  const languageInstruction = languageMap[language] || "English";

  try {
    console.log(`Mengirim permintaan ke OpenAI: ${new Date().toISOString()}`); // Debugging
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful customer service representative for Emran Ghani Asahi Printing Company. 
          Respond in ${languageInstruction} with concise, friendly, and professional answers. 
          Focus on printing services, design, and business solutions.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Maaf, saya tidak dapat memproses permintaan Anda."
    );
  } catch (error: any) {
    console.error("Error getting OpenAI response:", error);

    // Tangani error 429 (Too Many Requests)
    if (error.status === 429 && retries > 0) {
      console.log(
        `Rate limit tercapai, mencoba lagi setelah 1 detik (sisa retry: ${retries})...`
      );
      await delay(1000); // Tunggu 1 detik
      return getChatbotResponse(message, language, retries - 1); // Retry
    }

    // Lempar error dengan pesan yang lebih spesifik
    if (error.status === 429) {
      throw new Error(
        "429: Terlalu banyak permintaan. Silakan coba lagi nanti."
      );
    }
    throw new Error("Maaf, terjadi kesalahan saat menghubungi server AI.");
  }
}
