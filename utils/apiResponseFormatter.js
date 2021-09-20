module.exports = {
  apiResponse(statusCode, status, payload, error) {
    return {
      statusCode,
      status,
      payload,
      error,
    };
  },
};
