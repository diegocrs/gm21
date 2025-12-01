import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a production app, the key should come from environment variables.
// For this generated code, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getExerciseTip = async (exerciseName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Para ver dicas personalizadas, por favor configure a chave da API do Gemini.";
  }

  try {
    const prompt = `
      Você é um personal trainer especialista em glúteos e pernas para mulheres.
      Dê uma dica muito breve (máximo 2 frases) e crucial sobre a execução correta de: "${exerciseName}".
      Foque na segurança e na máxima ativação muscular.
      Não use markdown, apenas texto simples.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Mantenha a postura correta e contraia o abdômen.";
  } catch (error) {
    console.error("Erro ao buscar dica:", error);
    return "Concentre-se na conexão mente-músculo durante este exercício.";
  }
};
