export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "long", // February
    day: "numeric", // 12
    year: "numeric", // 2025
  });
};
