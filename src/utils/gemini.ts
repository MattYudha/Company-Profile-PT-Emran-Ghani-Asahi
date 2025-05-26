import axios from "axios";

// Environment variable for Gemini API Key
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Base URL for the Gemini API
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Comprehensive and structured company profile data for PT. EMRAN GHANIM ASAHI
const companyProfile = {
  about: `PT. EMRAN GHANIM ASAHI, established on **April 3, 2023**, is a leading provider of **printing and labeling services** based in Tangerang, Banten. Our vision is to become a global leader by delivering **high-quality, innovative solutions** for the retail, fashion, and logistics sectors, backed by state-of-the-art equipment and a dedicated professional team.`,
  services: `We offer a wide range of products including **UPC labels, stickers, custom books, calendars, brochures, polybags, barcode labels, hangtags, size labels, care labels, inboxes, screen printing services, custom ribbons, and personalized stationery**. Our solutions cater to diverse industry needs.`,
  contact: `You can reach us at **The Avenue Block Z 06/36, Citra Raya, Cikupa, Tangerang**. For inquiries, email us at **sales@emranghanimasahi.net** or call us at **(021) 89088260**. You can also directly contact **Mr. Darmawan at 0813-9831-8839**.`,
  partners: `We proudly collaborate with esteemed partners such as **PT. UNIMITRA KHARISMA, PT. HWA SEUNG INDONESIA, and PT. SMART MULTI FINANCE**, enabling us to undertake and successfully deliver large-scale projects.`,
  equipment: `Our production capabilities are supported by advanced machinery, including **cutting machines (17,500 units/day), offset printers (49,000 units/day), and sealing machines (35,000 units/day)**, ensuring high-quality output and efficient production.`,
  legal: `PT. EMRAN GHANIM ASAHI operates under full compliance with Indonesian regulations, possessing a valid **Akta Pendirian (Deed of Establishment), NPWP (Taxpayer Identification Number), and NIB (Business Identification Number)**.`,
  whyChooseUs: `Choose PT. EMRAN GHANIM ASAHI for **superior quality printing, timely delivery, and professional service** tailored for the retail, fashion, and logistics industries. We are committed to exceeding your expectations with every project.`,
  generalInquiry: `I'm here to help you with anything related to PT. EMRAN GHANIM ASAHI's **printing and labeling services**. Please ask me about our products, services, or company information!`,
};

// Utility function to introduce a delay, useful for handling API rate limits
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Interface for the expected structure of the Gemini API response
interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
  error?: {
    code: number;
    message: string;
    status: string;
    details?: any[];
  };
}

/**
 * Generates a chatbot response based on the user's message and preferred language.
 * It prioritizes direct answers from company profile keywords before resorting to the Gemini API.
 * Includes robust error handling and retry mechanisms for API calls.
 *
 * @param message The user's input message.
 * @param language The desired language for the response (e.g., 'en', 'id'). Defaults to 'en'.
 * @param retries The number of retries for API calls in case of rate limiting. Defaults to 3.
 * @returns A promise that resolves to the chatbot's response string.
 * @throws Error if the Gemini API key is not configured or if other unrecoverable API errors occur.
 */
export async function getChatbotResponse(
  message: string,
  language: string = "en",
  retries: number = 3
): Promise<string> {
  // Map language codes to full language names for prompt generation
  const languageMap: { [key: string]: string } = {
    en: "English",
    id: "Indonesian",
    ja: "Japanese",
    zh: "Chinese",
    ar: "Arabic",
  };
  const languageInstruction = languageMap[language] || "English";

  // Normalize message for keyword matching
  const lowerMessage = message.toLowerCase();

  // --- Keyword-based responses for company profile ---
  if (
    lowerMessage.includes("company profile") ||
    lowerMessage.includes("tentang perusahaan") ||
    lowerMessage.includes("about us") ||
    lowerMessage.includes("profil perusahaan") ||
    lowerMessage.includes("what is pt emran ghanim asahi")
  ) {
    return companyProfile.about;
  }
  if (
    lowerMessage.includes("services") ||
    lowerMessage.includes("layanan") ||
    lowerMessage.includes("produk") ||
    lowerMessage.includes("what do you offer")
  ) {
    return companyProfile.services;
  }
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("kontak") ||
    lowerMessage.includes("hubungi") ||
    lowerMessage.includes("get in touch")
  ) {
    return companyProfile.contact;
  }
  if (
    lowerMessage.includes("partners") ||
    lowerMessage.includes("mitra") ||
    lowerMessage.includes("klien") ||
    lowerMessage.includes("who do you work with")
  ) {
    return companyProfile.partners;
  }
  if (
    lowerMessage.includes("equipment") ||
    lowerMessage.includes("mesin") ||
    lowerMessage.includes("peralatan") ||
    lowerMessage.includes("machinery")
  ) {
    return companyProfile.equipment;
  }
  if (
    lowerMessage.includes("legal") ||
    lowerMessage.includes("legalitas") ||
    lowerMessage.includes("izin") ||
    lowerMessage.includes("licenses")
  ) {
    return companyProfile.legal;
  }
  if (
    lowerMessage.includes("recommendation") ||
    lowerMessage.includes("kenapa memilih") ||
    lowerMessage.includes("why choose") ||
    lowerMessage.includes("benefits")
  ) {
    return companyProfile.whyChooseUs;
  }
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hallo") ||
    lowerMessage.includes("hai")
  ) {
    return `Hello! ${companyProfile.generalInquiry}`;
  }

  // --- Gemini API Key validation ---
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Gemini API key is not configured. Please set the VITE_GEMINI_API_KEY environment variable in your .env file."
    );
  }

  try {
    console.log(
      `Attempting to get response from Gemini API: ${new Date().toISOString()}`
    );

    // --- Gemini API Request ---
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an expert, friendly, and highly professional customer service representative for PT. EMRAN GHANIM ASAHI. Your primary goal is to provide accurate, concise, and helpful information about the company's printing and labeling services.

**Company Profile Summary:**
PT. EMRAN GHANIM ASAHI was established on April 3, 2023, in Tangerang, Banten. We specialize in high-quality printing and labeling solutions for the retail, fashion, and logistics industries. Our commitment is to innovation, efficiency, and customer satisfaction, utilizing modern equipment and a skilled team.

**Key Information:**
- **Services:** UPC labels, stickers, books, calendars, brochures, polybags, barcode labels, hangtags, size labels, care labels, inboxes, screen printing, custom ribbons, and personalized stationery.
- **Contact Information:** The Avenue Block Z 06/36, Citra Raya, Cikupa, Tangerang. Email: sales@emranghanimasahi.net. Phone: (021) 89088260, or directly Mr. Darmawan at 0813-9831-8839.
- **Partners:** PT. UNIMITRA KHARISMA, PT. HWA SEUNG INDONESIA, PT. SMART MULTI FINANCE.

**Instructions for your responses:**
1.  **Language:** Respond strictly in ${languageInstruction}.
2.  **Conciseness:** Keep answers under 60 words, focusing on direct and relevant information.
3.  **Professionalism:** Maintain a friendly, polite, and professional tone at all times.
4.  **Relevance:** Prioritize information related to PT. EMRAN GHANIM ASAHI's printing and labeling services, design processes, business solutions, and company details.
5.  **Redirection:** If a query is clearly unrelated to our business (e.g., asking for medical advice, personal opinions, or general knowledge questions), politely state that you can only assist with topics related to PT. EMRAN GHANIM ASAHI's services. For example: "I specialize in PT. EMRAN GHANIM ASAHI's printing and labeling services. How can I assist you with that?"
6.  **Avoid Speculation:** Do not generate information beyond what is provided or speculate on future plans.
7.  **Data Consistency:** Always refer to the provided company details for accuracy.

**User Query:** ${message}`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 200, // Slightly increased to allow for more nuanced short answers
          temperature: 0.5, // Reduced for more focused and less speculative responses
          topP: 0.9,
          topK: 40,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.warn("Gemini API returned an empty or invalid response.");
      return "I apologize, but I couldn't generate a clear response to your request at this moment. Could you please rephrase your question or ask about our printing services?";
    }

    return reply.trim();
  } catch (error: any) {
    console.error(
      "Error getting Gemini response:",
      error.response?.data || error.message
    );

    // --- Error Handling with Retries ---
    if (error.response?.status === 429 && retries > 0) {
      console.log(
        `Rate limit hit. Retrying in 1 second. Attempts left: ${retries - 1}`
      );
      await delay(1000); // Wait for 1 second before retrying
      return getChatbotResponse(message, language, retries - 1);
    }

    // More specific error messages for better user/developer feedback
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(
            `Bad Request to Gemini API. This might be due to invalid input. Details: ${
              data?.error?.message || "No specific error message."
            }`
          );
        case 401:
        case 403:
          throw new Error(
            "Authentication Error: Invalid Gemini API key or insufficient permissions. Please verify your VITE_GEMINI_API_KEY."
          );
        case 402:
          throw new Error(
            "Payment Required: Gemini API billing issue. Please check your Google Cloud project's billing status."
          );
        case 500:
        case 503:
          throw new Error(
            "Gemini API Server Error: The AI service is currently unavailable. Please try again shortly."
          );
        default:
          throw new Error(
            `An unexpected API error occurred (Status: ${status}). Please try again later. Details: ${
              data?.error?.message || "No specific error message."
            }`
          );
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error)
      throw new Error(
        "Network Error: No response received from the Gemini AI server. Please check your internet connection."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(
        `An unknown error occurred while setting up the request: ${error.message}`
      );
    }
  }
}
