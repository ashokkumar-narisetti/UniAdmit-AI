require('dotenv').config();
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Fix for Node 18+ undici fetch IPv6 issues

const geminiService = require('./src/services/gemini.service');

async function test() {
  try {
    const res = await geminiService.generateRecommendation({
      tenth_percentage: 90,
      tenth_attendance: 90,
      inter_percentage: 90,
      inter_attendance: 90,
      eligibility_prediction: "ELIGIBLE"
    });
    console.log("Success:", res);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
