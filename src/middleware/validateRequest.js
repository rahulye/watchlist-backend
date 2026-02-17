/** @format */

// handle the request body data types , like a schema for the body
// main validation methods

const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map(issue => ({
        field: issue.path,
        message: issue.message,
      })),
    });
  }

  next();
};

export { validateRequest };

