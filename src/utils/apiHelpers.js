import axios from "./Axios";

/**
 * Makes a POST request with empty body as JSON
 * This helps avoid content-type issues when backends expect JSON
 *
 * @param {string} url - The URL to post to
 * @returns {Promise} - The axios response
 */
export const postEmptyJson = async (url) => {
  return axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
