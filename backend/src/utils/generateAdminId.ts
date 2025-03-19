const generateAdminId = (lastAdminId: string): string => {
  const parts = lastAdminId.split("-");
  const numericPart = parts[2];

  const newNumericPart = (parseInt(numericPart, 10) + 1)
    .toString()
    .padStart(4, "0");

  const incrementedId = `US-AD-${newNumericPart}`;
  return incrementedId;
};

export default generateAdminId;
