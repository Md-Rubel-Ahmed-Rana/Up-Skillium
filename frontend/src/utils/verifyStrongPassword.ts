
import strongPasswordRules from "@/constants/passwordRegx";

const verifyStrongPassword = (password: string) => {
  const errors: string[] = [];

  if (password.length < 8 || password.length > 15) {
    errors.push("Password must be 8-15 characters long");
  }

  for (const condition in strongPasswordRules) {
    if (
      !strongPasswordRules[condition as keyof typeof strongPasswordRules].test(password)
    ) {
      switch (condition) {
        case "hasUpperCase":
          errors.push("At least one uppercase letter.");
          break;
        case "hasLowerCase":
          errors.push("At least one lowercase letter.");
          break;
        case "hasNumber":
          errors.push("At least one number.");
          break;
        case "hasSpecialChar":
          errors.push("At least one special character (@#$%^&+=!).");
          break;
      }
    }
  }

  return errors;
};

export default verifyStrongPassword;