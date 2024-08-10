export default function formatDate(inputDate) {
  const date = new Date(inputDate);
  const now = new Date();

  // Calculate the time difference in minutes
  const timeDifferenceInMinutes = Math.floor((now - date) / (1000 * 60));
  
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString() ===
    date.toDateString();
  
  const isWithinLastWeek = (date) => {
    const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    return date > weekAgo && date < now;
  };

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (timeDifferenceInMinutes < 60) { // Within 1 hour
    if (timeDifferenceInMinutes < 1) return "Just now";
    return `${timeDifferenceInMinutes} min ago`;
  } else if (isToday) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `Today ${hours}:${minutes}`;
  } else if (isYesterday) {
    return "Yesterday";
  } else if (isWithinLastWeek(date)) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  } else {
    const currentYear = now.getFullYear();
    const dateYear = date.getFullYear();
    if (currentYear === dateYear) {
      return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }).replace(/\//g, "-"); // Format as DD-MM
    } else {
      return date.toLocaleDateString("en-GB", options).replace(/\//g, "-"); // Format as DD-MM-YYYY
    }
  }
}

// // Example usage:
// const formattedDate = formatDate("2024-07-21T10:30:00.000Z");
// console.log(formattedDate); // Output will depend on the current date and time
