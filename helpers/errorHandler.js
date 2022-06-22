const errorHandler = (err, res) => {
  console.log(err);
  console.log(err.message);
  res.status(403).send({
    status: "failed",
    data: err,
    message: "Access Denied",
  });
};
module.exports = errorHandler;
