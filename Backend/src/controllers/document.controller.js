const documentService = require(
  "../services/document.service"
);

const uploadDocument = async (
  req,
  res
) => {
console.log("DOCUMENT API HIT");
console.log(req.body);
console.log(req.file?.filename);
  try {

    const result =
      await documentService.uploadDocument({
        applicationId:
          req.body.applicationId,

        documentType:
          req.body.documentType,

        fileName:
          req.file.filename,

        filePath:
          req.file.path,
      });

    res.status(201).json({
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

module.exports = {
  uploadDocument,
};