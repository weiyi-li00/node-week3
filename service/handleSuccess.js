function handleSuccess (res, data) { 
  res.status(200).json({
    status: "status",
    post: data
  });
}

module.exports = handleSuccess;