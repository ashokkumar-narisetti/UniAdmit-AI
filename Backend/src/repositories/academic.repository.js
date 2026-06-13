const pool = require("../config/database");
const createAcademicRecord = async (
  
  academicData
) => {

  const [result] = await pool.execute(
    `
    INSERT INTO academic_records
    (
      application_id,

      tenth_school_name,
      tenth_board,
      tenth_passout_year,
      tenth_percentage,
      tenth_attendance,

      inter_college_name,
      inter_board,
      inter_passout_year,
      inter_percentage,
      inter_attendance
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      academicData.applicationId,

      academicData.tenthSchoolName,
      academicData.tenthBoard,
      academicData.tenthPassoutYear,
      academicData.tenthPercentage,
      academicData.tenthAttendance,

      academicData.interCollegeName,
      academicData.interBoard,
      academicData.interPassoutYear,
      academicData.interPercentage,
      academicData.interAttendance,
    ]
  );

  return result.insertId;
};

module.exports = {
  createAcademicRecord,
};