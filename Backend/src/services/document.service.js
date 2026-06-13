const documentRepository = require(
  "../repositories/document.repository"
);

const uploadDocument = async (
  data
) => {

  const documentId =
    await documentRepository.createDocument(
      data
    );

  return {
    documentId,
  };
};

module.exports = {
  uploadDocument,
};