function handleSuccess(res, data) {
  res.status(200).json({
    status: "ture",
    post: data
  });
}

module.exports = handleSuccess;
