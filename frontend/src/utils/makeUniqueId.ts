export const makeUniqueId = (title: string): string => {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "_");

  const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return `${slug}_${unique}`;
};
