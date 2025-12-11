import { GoogleGenAI, Type } from "@google/genai";

// Initialize the API client
// Note: In a real production app, this should be proxied through a backend to protect the API Key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const verifyItemImage = async (base64Image: string): Promise<{ isSafe: boolean; reason: string; category?: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Analyze this image for a C2C marketplace. 
      1. Check if the item is illegal, dangerous (weapons, drugs), or explicit content.
      2. Identify the general product category (e.g., Electronics, Fashion, Furniture).
      
      Return JSON with the following schema:
      {
        "isSafe": boolean,
        "reason": string,
        "category": string
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            category: { type: Type.STRING },
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Verification Error:", error);
    return { isSafe: true, reason: "AI Verification Failed - Manual Review Required" }; // Fallback
  }
};

export const suggestPrice = async (title: string, description: string): Promise<{ min: number; max: number; explanation: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Based on the product title "${title}" and description "${description}", 
      suggest a competitive price range for a used item in a C2C marketplace.
      Assume the currency is USD.
      
      Return JSON:
      {
        "min": number,
        "max": number,
        "explanation": string
      }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            min: { type: Type.NUMBER },
            max: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
          }
        }
      }
    });

     const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Price Suggestion Error:", error);
    return { min: 0, max: 0, explanation: "Could not estimate price." };
  }
};

export const getChatbotResponse = async (message: string, history: string[] = []): Promise<string> => {
   try {
    const model = 'gemini-2.5-flash';
    const chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: "You are a helpful support assistant for SecureTrade C2C Marketplace. You help users with escrow, shipping, and account issues."
        }
    });
    
    // In a real app, we would load history into the chat session.
    // For this simple example, we just send the new message.
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't understand that.";
   } catch (e) {
       return "System is currently unavailable.";
   }
}
