import axios from "../utils/Axios";

export const NewsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    try {
      const response = await axios.post("/api/v1/newsletter/subscribe", {
        email,
      });
      return response.data;
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      throw error;
    }
  },
};
