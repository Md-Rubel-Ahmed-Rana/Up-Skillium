const generateTeacherId = (lastTeacherId: string): string => {
  const parts = lastTeacherId.split("-");
  const numericPart = parts[2];

  const newNumericPart = (parseInt(numericPart, 10) + 1)
    .toString()
    .padStart(4, "0");

  const incrementedId = `US-TE-${newNumericPart}`;
  return incrementedId;
};

export default generateTeacherId;
