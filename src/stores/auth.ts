import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = 'https://funcapp-takmilplatform-dev.azurewebsites.net/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(`${API_BASE_URL}/people/auth/login`, { username, password });
        this.token = response.data.accessToken;
        // Store the token in localStorage
        localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Failed to login:', error);
      }
    },
    logout() {
      this.token = '';
      localStorage.removeItem('token');
    }
  }
});
