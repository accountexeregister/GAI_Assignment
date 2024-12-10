import express from "express";
import OpenAI from "openai";
import faqData from "../../data/faq.json";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are a customer support chatbot for DeviceCare. Answer questions based strictly on the following FAQs:
${faqData.map((faq, index) => `${index + 1}. Q: ${faq.question} A: ${faq.answer}`).join("\n")}
If the question is outside the scope of these FAQs, respond with "Sorry, this is outside the scope of my knowledge."
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