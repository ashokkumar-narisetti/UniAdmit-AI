const applicationService = require(
  "../services/application.service"
);
const geminiService = require("../services/gemini.service");

const submitApplication = async (
  req,
  res
) => {
  try {
    const result =
      await applicationService.createApplication(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllApplications = async (
  req,
  res
) => {
  try {

    const applications =
      await applicationService.getAllApplications();

    res.status(200).json({
      success: true,
      data: applications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getApplicationById = async (
  req,
  res
) => {
  try {

    const application =
      await applicationService.getApplicationById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: application,
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message,
    });

  }
};
const updateApplicationStatus =
  async (req, res) => {

    try {

      const result =
        await applicationService
          .updateApplicationStatus(
            req.params.id,
            req.body.status
          );

      res.status(200).json({
        success: true,
        data: result,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};
const getFullApplicationById =
async (req, res) => {

  try {

    const result =
      await applicationService
        .getFullApplicationById(
          req.params.id
        );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const trackApplication = async (
  req,
  res
) => {
  try {
    const { applicationId, dateOfBirth } = req.body;
    
    if (!applicationId || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: "Application ID and Date of Birth are required",
      });
    }

    const data = await applicationService.getFullApplicationById(applicationId);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const app = data[0];
    
    // Compare DOB ignoring time and timezone shifts
    const storedDob = new Date(app.date_of_birth).toLocaleDateString('en-CA');
    const inputDob = new Date(dateOfBirth).toLocaleDateString('en-CA');

    if (storedDob !== inputDob) {
      return res.status(401).json({
        success: false,
        message: "Invalid Date of Birth for the provided Application ID",
      });
    }

    res.status(200).json({
      success: true,
      data: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApplicationPrediction = async (req, res) => {
  try {
    const data = await applicationService.getFullApplicationById(req.params.id);
    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    const app = data[0];

    // Build the payload expected by the ML API
    const mlPayload = {
      tenthPercentage: parseFloat(app.tenth_percentage) || 0,
      tenthAttendance: parseFloat(app.tenth_attendance) || 0,
      interPercentage: parseFloat(app.inter_percentage) || 0,
      interAttendance: parseFloat(app.inter_attendance) || 0
    };

    // Make the request to the Flask server
    const mlResponse = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mlPayload)
    });

    if (!mlResponse.ok) {
      throw new Error(`ML server returned ${mlResponse.status}`);
    }

    const mlResult = await mlResponse.json();

    // Call Gemini API for recommendation
    const studentData = {
      tenth_percentage: app.tenth_percentage || 0,
      tenth_attendance: app.tenth_attendance || 0,
      inter_percentage: app.inter_percentage || 0,
      inter_attendance: app.inter_attendance || 0,
      eligibility_prediction: mlResult.prediction
    };
    
    let recommendation = "AI recommendation not available.";
    try {
      recommendation = await geminiService.generateRecommendation(studentData);
    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError);
    }

    res.status(200).json({
      success: true,
      data: {
        ...mlResult,
        recommendation: recommendation
      }
    });

  } catch (error) {
    console.error("Error calling ML prediction API:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get AI prediction"
    });
  }
};

module.exports = {
  getFullApplicationById,
  updateApplicationStatus,
  submitApplication,
  getAllApplications,
  getApplicationById,
  trackApplication,
  getApplicationPrediction,
};