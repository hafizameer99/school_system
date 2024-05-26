import axios from "axios"; // Import Axios for HTTP requests
import { useAuthStore } from "@/stores/auth"; // Import AuthStore for accessing authentication token
// Adjust the path above as needed to match your project structure

// Retrieve API base URL from environment variables
const API_BASE_URL = process.env.VUE_APP_BASE_URL;

// Create an Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Set base URL for API requests
});

// Add request interceptor to attach authentication token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Access AuthStore to get authentication token
    const authStore = useAuthStore();
    const token = authStore.token || localStorage.getItem("token"); // Get token from AuthStore or localStorage

    if (token) {
      // If token is available, add it to the request headers for authorization
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token is found, throw an error
      throw new Error("No token found");
    }

    return config; // Return the modified request configuration
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error); // Reject the request with the error
  }
);

export default axiosInstance; // Export the customized Axios instance for use in other parts of the application
