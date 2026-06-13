require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("gemini-pro:", result.response.text());
  } catch(e) {
    console.error("gemini-pro error:", e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("gemini-1.5-flash:", result.response.text());
  } catch(e) {
    console.error("gemini-1.5-flash error:", e.message);
  }
}

listModels();
