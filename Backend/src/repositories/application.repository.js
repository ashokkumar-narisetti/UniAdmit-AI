const pool = require("../config/database");

const findByEmailAndPhone = async (email, phone) => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM applications
    WHERE email = ?
    AND phone = ?
    `,
    [email, phone]
  );

  return rows[0] || null;
};

const createApplication = async (applicationData) => {
  const [result] = await pool.execute(
    `
    INSERT INTO applications
    (
      application_id,
      full_name,
      email,
      phone,
      gender,
      date_of_birth,
      address,
      category,
      parent_name,
      parent_phone,
      course,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      applicationData.applicationId,
      applicationData.fullName,
      applicationData.email,
      applicationData.phone,
      applicationData.gender,
      applicationData.dateOfBirth,
      applicationData.address,
      applicationData.category,
      applicationData.parentName,
      applicationData.parentPhone,
      applicationData.course,
      "SUBMITTED",
    ]
  );

  return result.insertId;
};
const getAllApplications = async () => {
  const [rows] = await pool.execute(
    `
    SELECT *
    FROM applications
    ORDER BY created_at DESC
    `
  );

  return rows;
};
const getApplicationById = async (id) => {
  const isTrackingId = String(id).startsWith("APP-");
  const whereClause = isTrackingId ? "application_id = ?" : "id = ?";

  const [rows] = await pool.execute(
    `
    SELECT *
    FROM applications
    WHERE ${whereClause}
    `,
    [id]
  );

  return rows[0] || null;
};
const updateApplicationStatus = async (
  id,
  status
) => {

  const [result] = await pool.execute(
    `
    UPDATE applications
    SET status = ?
    WHERE id = ?
    `,
    [status, id]
  );

  return result;
};
const getFullApplicationById = async (id) => {

    const isTrackingId = String(id).startsWith("APP-");
    const whereClause = isTrackingId ? "a.application_id = ?" : "a.id = ?";

    const [rows] = await pool.execute(
      `
      SELECT
  
        a.*,
  
        ar.tenth_school_name,
        ar.tenth_board,
        ar.tenth_passout_year,
        ar.tenth_percentage,
        ar.tenth_attendance,
  
        ar.inter_college_name,
        ar.inter_board,
        ar.inter_passout_year,
        ar.inter_percentage,
        ar.inter_attendance,
  
        d.document_type,
        d.file_name,
        d.file_path
  
      FROM applications a
  
      LEFT JOIN academic_records ar
        ON a.id = ar.application_id
  
      LEFT JOIN documents d
        ON a.id = d.application_id
  
      WHERE ${whereClause}
      `,
      [id]
    );
  
    return rows;
};
const updateEligibilityPrediction = async (
  applicationId,
  prediction,
  confidence
) => {

  await pool.execute(
    `
    UPDATE applications
    SET
      eligibility_prediction = ?,
      eligibility_score = ?
    WHERE id = ?
    `,
    [
      prediction,
      confidence,
      applicationId
    ]
  );
};
module.exports = {
  updateEligibilityPrediction,
  getFullApplicationById,
  updateApplicationStatus,
  findByEmailAndPhone,
  createApplication,
  getAllApplications,
  getApplicationById
};