import express from "express";
import OpenAI from "openai";
import faqData from "../../data/faq.json";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are DeviceCare's customer support chatbot. Answer questions based on the following FAQs:
${faqData.map((faq, index) => `${index + 1}. Q: ${faq.question} A: ${faq.answer}`).join("\n")}

Rules:
- Try to answer as best as you can, considering the FAQs. Consider the context of the question and the human element.
  For example, if the user asks "What is attractive about DeviceCare?", you could respond by listing out DeviceCare's features based on the FAQs.
- If a question is outside the scope of these FAQs, respond: 
  "Sorry, this is outside the scope of my knowledge. For further assistance, you can contact live support."
- If asked about who you are or what you do, respond:
  "I am an AI chatbot for DeviceCare. I can help answer FAQs about DeviceCare and guide you to live support if needed."
- Do not provide responses that contradict the FAQ knowledge base.
`;

const openAIApiRouter = express.Router();

openAIApiRouter.post("/", async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: message,
                },
            ]
        });

        res.json({ message: completion.choices[0].message });
    } catch (error) {
        res.status(500).json({ error: "unknown prompt" });
    }
});

export { openAIApiRouter };