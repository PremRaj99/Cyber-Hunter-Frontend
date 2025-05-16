import axios from "../utils/Axios";

export class ContactService {
  static async submitContactForm(formData) {
    try {
      const response = await axios.post("/api/v1/contact", formData);
      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }

  // Admin-only methods
  static async getAllContacts() {
    try {
      const response = await axios.get("/api/v1/contact");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  static async getContactById(id) {
    try {
      const response = await axios.get(`/api/v1/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  }

  static async updateContactStatus(id, updateData) {
    try {
      const response = await axios.patch(`/api/v1/contact/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  }
}

export default ContactService;
