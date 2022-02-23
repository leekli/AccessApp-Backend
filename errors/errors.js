// errors/errors.js - Error handling file

exports.handle404s = (req, res) => {
  res.status(404).json({ msg: "Invalid URL" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).json({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleMdbErrors = (err, req, res, next) => {
  if (
    err.name === "CastError" ||
    err.name === "ValidationError" ||
    err.name === "DocumentNotFoundError" ||
    err.name === "ValidatorError" ||
    err.name === "MissingSchemaError"
  ) {
    res.status(400).json({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Internal server error" });
};
