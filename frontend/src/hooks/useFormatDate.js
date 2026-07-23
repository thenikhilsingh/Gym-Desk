export default function useFormatDate() {
  const formatDate = (date, type = "display") => {
    if (!date) return "";

    const d = new Date(date);

    if (type === "input") {
      return d.toISOString().split("T")[0];
    }

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return { formatDate };
}