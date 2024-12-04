const passwordValidationRegx = [
  { pattern: /(?=.*\d)/, message: "Password must contain a number" },
  {
    pattern: /(?=.*[A-Z])/,
    message: "Password must contain an uppercase letter",
  },
  {
    pattern: /(?=.*[a-z])/,
    message: "Password must contain a lowercase letter",
  },
  {
    pattern: /(?=.*[@$!%*?&])/,
    message: "Password must contain a special character",
  },
];

export default passwordValidationRegx;
