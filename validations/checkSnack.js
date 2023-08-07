const checkName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Please insert Name" });
  } else {
    next();
  }
};

const checkIfBoolean = (req, res, next) => {
  const is_healthy = req.body.is_healthy;

  if (typeof is_healthy !== "boolean") {
    res.status(400).json({ error: "is_healthy must be a boolean value" });
  } else {
    next();
  }
};

const validateURL = (req, res, next) => {
  if (
    req.body.image_url.substring(0, 7) === "http://" ||
    req.body.image_url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .json({ error: "You forgot to start your url with http:// or https://" });
  }
};
module.exports = { checkName, checkIfBoolean, validateURL };
