import express from "express";
import OpenAI from "openai";
import faqData from "../../data/faq.json";
import { generateDeviceCareChatbotSystemPrompt } from "../system-prompts/deviceCareChatbot";
import {
  OPENAI_ERROR_AUTHENTICATION_ERROR,
  OPENAI_ERROR_BAD_REQUEST_ERROR,
  OPENAI_ERROR_INTERNAL_SERVER_ERROR,
  OPENAI_ERROR_NOT_FOUND_ERROR,
  OPENAI_ERROR_PERMISSION_DENIED_ERROR,
  OPENAI_ERROR_RATE_LIMIT_ERROR,
  OPENAI_ERROR_UNPROCESSABLE_ENTITY_ERROR,
  OPENAI_MODEL,
  OPENAI_ROLE_SYSTEM,
  OPENAI_ROLE_USER,
} from "../types/openAI";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the chatbot. Used to provide DeviceCare's customer support chatbot context,
// and to define its behaviour
const systemPrompt = generateDeviceCareChatbotSystemPrompt();

const openAIApiRouter = express.Router();

openAIApiRouter.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: OPENAI_ROLE_SYSTEM,
          content: systemPrompt,
        },
        {
          role: OPENAI_ROLE_USER,
          content: message,
        },
      ],
    });

    res.json({ message: completion.choices[0].message });
  } catch (error) {
    if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_BAD_REQUEST_ERROR
    ) {
      res.status(error.status).json({
        error: `OpenAI API error occured due to invalid request: ${error.message}`,
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_AUTHENTICATION_ERROR
    ) {
      res.status(error.status).json({
        error:
          "OpenAI API error occured due to authentication error with OpenAI API",
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_PERMISSION_DENIED_ERROR
    ) {
      res.status(error.status).json({
        error:
          "OpenAI API error occured due to insufficient permissions to access the requested resource",
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_NOT_FOUND_ERROR
    ) {
      res.status(error.status).json({
        error: "OpenAI API error occured due to resource not found",
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_UNPROCESSABLE_ENTITY_ERROR
    ) {
      res.status(error.status).json({
        error:
          "OpenAI API error occured due to request being unable to processed. This is unlikely to be your fault. Please try again.",
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status === OPENAI_ERROR_RATE_LIMIT_ERROR
    ) {
      res.status(error.status).json({
        error:
          "OpenAI API error occured due to too many requests. Please try again later.",
      });
    } else if (
      error instanceof OpenAI.APIError &&
      error.status &&
      error.status >= OPENAI_ERROR_INTERNAL_SERVER_ERROR
    ) {
      res.status(error.status).json({
        error: "OpenAI API error occured due to an internal server error",
      });
    } else if (error instanceof OpenAI.APIError) {
      // APIConnectionError
      res.status(500).json({
        error:
          "OpenAI API error occured due to error connecting with OpenAI API",
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

openAIApiRouter.get("/faqs", (req, res) => {
  // Gets only the questions from the FAQ data
  const faqs = faqData.map((faq) => faq.question);
  res.json({ faqs });
});

export { openAIApiRouter };
