# Generative AI Chatbot for Frontline Customer Support

An AI chatbot that acts as customer support for a product. It answers product-related FAQs, assists users through a user-friendly interface, and integrates with OpenAI API to generate responses. If required, it redirects customers to live support.

## Features

- **Intelligent FAQ Assistance**: Custom chatbot powered by GPT-4 that provides accurate answers to product-related FAQs.
- **Fallback to Live Support**: Automatically redirects customers to live support for questions outside the chatbot's scope.
- **Customer Emotion Detection**: Detects negative sentiment and suggests redirecting to live support when necessary.
- **Time-Saving FAQs**: Clickable FAQ buttons offer quick answers to common questions.

## Technologies used

**Frontend**: Node.js, TypeScript, React.js, Tailwind CSS  
**Backend**: Node.js, TypeScript, Express.js, OpenAI API

## Requirements to run

- **Node.js** >= 20
- **OpenAI API** account with a valid and usable key

## Setup and Run

### Backend Setup and Run

- Navigate to backend directory from the root of the repo (e.g. `cd backend`).
- Create `.env` file in the backend directory.
- Set environment variable `OPENAI_API_KEY="<openai api key>"`, where `"<openai api key>"` must be a valid OpenAI API key.
- Set environment variable `PORT="<backend port>"`, where `"<backend port>"` is the port of the backend. The frontend will use this port to connect to the backend.
- Install dependencies using `npm install`.
- Build using `npm run build`.
- Run the backend using `npm start`. The backend will run on localhost at port `<PORT>`, where `<PORT>` is the value you set for the `PORT` environment variable (e.g. http://localhost:3000 if `PORT=3000`).

### Frontend Setup and Run

- Navigate to frontend directory from the root of the repo (e.g. `cd frontend`).
- Create `.env` file in the backend directory.
- Set environment variable `VITE_BACKEND_BASE_URL="<backend url>"`, where `"<backend url>"` must be the backend's url (e.g. `VITE_BACKEND_BASE_URL=http://127.0.0.1:3000`).
- Install dependencies using `npm install`.
- Build using `npm run build`.
- Run the backend using `npm start`. By default, it opens on http://localhost:4173.

## Documentation

### Chatbot OpenAI API Integration

**1. FAQ Management**

- FAQs are stored in a JSON file located at `backend/data/faq.json`.
- Each FAQ entry is stored in this format:

  ```json
  {
    "question": "<QUESTION>",
    "answer": "<ANSWER>"
  }
  ```

**2. Prompt Construction**

- FAQ data is passed to OpenAI via the system prompt in this structured format:

```
<Question Number>. Q: <Question> A: <Answer>
```

For example:

```
1. Q: What is DeviceCare? A: DeviceCare is a comprehensive device management...
2. Q: How do I install DeviceCare on my device? A: To install DeviceCare, download ...
...
```

Feeding the QnA to the AI in this format prompts the AI to recognise how to respond to the related questions.

- Rules are also defined for the AI by using a `Rules` section in the AI's system prompt. The rules are used to:

  - Restrict changes to the chatbot's role or behaviour.
  - Redirect customers to live support when necessary.
  - Other additional rules of how the chatbot should behave.
