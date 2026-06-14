const axios = require("axios");
const applicationRepository = require(
  "../repositories/application.repository"
);
const academicRepository = require(
  "../repositories/academic.repository"
);
const createApplication = async (data) => {
  const existingApplication =
    await applicationRepository.findByEmailAndPhone(
      data.email,
      data.phone
    );

  if (existingApplication) {
    throw new Error(
      "Application already exists"
    );
  }

  const applicationId =
    `APP-${Date.now()}`;

  const id =
  await applicationRepository.createApplication({
    ...data,
    applicationId,
  });

await academicRepository.createAcademicRecord({
  applicationId: id,

  tenthSchoolName: data.tenthSchoolName,
  tenthBoard: data.tenthBoard,
  tenthPassoutYear: data.tenthPassoutYear,
  tenthPercentage: data.tenthPercentage,
  tenthAttendance: data.tenthAttendance,

  interCollegeName: data.interCollegeName,
  interBoard: data.interBoard,
  interPassoutYear: data.interPassoutYear,
  interPercentage: data.interPercentage,
  interAttendance: data.interAttendance,
});
let prediction = "PENDING";
let confidence = 0;

try {
  const mlResponse = await axios.post(
    `${process.env.ML_API_URL}/predict`,
    {
      tenthPercentage: Number(data.tenthPercentage),
      tenthAttendance: Number(data.tenthAttendance),
      interPercentage: Number(data.interPercentage),
      interAttendance: Number(data.interAttendance)
    }
  );
  prediction = mlResponse.data.prediction;
  confidence = mlResponse.data.confidence;
  console.log("ML Prediction:", mlResponse.data);
} catch (error) {
  console.error("ML Prediction Failed during application submission. Setting to PENDING.", error.message);
}

await applicationRepository
  .updateEligibilityPrediction(
    id,
    prediction,
    confidence
  );
return {
  id,
  applicationId,
};
};
const getAllApplications = async () => {
  return await applicationRepository.getAllApplications();
};
const getApplicationById = async (id) => {

  const application =
    await applicationRepository.getApplicationById(id);

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};
const updateApplicationStatus = async (
  id,
  status
) => {

  const allowedStatuses = [
    "SUBMITTED",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
  ];

  if (
    !allowedStatuses.includes(status)
  ) {
    throw new Error(
      "Invalid status"
    );
  }

  const application =
    await applicationRepository.getApplicationById(
      id
    );

  if (!application) {
    throw new Error(
      "Application not found"
    );
  }

  await applicationRepository
    .updateApplicationStatus(
      id,
      status
    );

  return {
    message:
      "Status updated successfully",
  };
};
const getFullApplicationById =
async (id) => {

  const data =
    await applicationRepository
      .getFullApplicationById(id);

  return data;
};
module.exports = {
  getFullApplicationById,
  updateApplicationStatus,
  createApplication,
  getAllApplications,
  getApplicationById,
};