/**
 * Returns the appropriate CSS class for a project status badge
 * @param {string} status - The project status (Open, In Progress, Completed)
 * @returns {string} CSS class string
 */
export function getStatusClass(status) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "open") {
    return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800";
  } else if (normalizedStatus === "in progress") {
    return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800";
  } else {
    return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800";
  }
}
