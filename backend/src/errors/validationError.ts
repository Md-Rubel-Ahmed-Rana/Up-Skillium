import { ZodError, ZodIssue } from "zod";

const handleZodValidationError = (error: ZodError) => {
  const errors = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return errors;
};

export default handleZodValidationError;
