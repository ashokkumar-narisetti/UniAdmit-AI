const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const generateRecommendation =
  async (studentData) => {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

    const prompt = `
You are an admission officer assistant.

Student Details:

10th Percentage:
${studentData.tenth_percentage}

10th Attendance:
${studentData.tenth_attendance}

Inter Percentage:
${studentData.inter_percentage}

Inter Attendance:
${studentData.inter_attendance}

Eligibility:
${studentData.eligibility_prediction}

Provide a professional admission recommendation in 3-4 sentences.
`;

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();
};

module.exports = {
  generateRecommendation
};