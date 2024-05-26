import { defineStore } from "pinia"; // Import necessary functions from Pinia
import axios from "axios"; // Import Axios for HTTP requests

const API_BASE_URL = "https://funcapp-takmilplatform-dev.azurewebsites.net/api"; // Base URL for API requests

// Define and export AuthStore using Pinia's defineStore function
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "", // Initialize token state with token from localStorage or empty string
  }),
  actions: {
    // Action for user login
    async login(username: string, password: string) {
      try {
        // Send POST request to login endpoint with username and password
        const response = await axios.post(`${API_BASE_URL}/people/auth/login`, {
          username,
          password,
        });
        // Set token state with the received access token from the response
        this.token = response.data.accessToken;
        // Store the token in localStorage for persistent login
        localStorage.setItem("token", this.token);
      } catch (error) {
        // Handle login failure
        console.error("Failed to login:", error);
      }
    },
    // Action for user logout
    logout() {
      // Clear token state
      this.token = "";
      // Remove token from localStorage
      localStorage.removeItem("token");
    },
  },
});
