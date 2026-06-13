const pool = require("../config/database");

const createDocument = async (
  documentData
) => {

  const [result] = await pool.execute(
    `
    INSERT INTO documents
    (
      application_id,
      document_type,
      file_name,
      file_path
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      documentData.applicationId,
      documentData.documentType,
      documentData.fileName,
      documentData.filePath,
    ]
  );

  return result.insertId;
};

module.exports = {
  createDocument,
};