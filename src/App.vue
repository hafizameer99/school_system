<template>
  <!-- Navigation bar displayed if user is logged in -->
  <nav v-if="authStore.token">
    <!-- Logout button -->
    <input
      type="button"
      class="btn btn-sm btn-danger mx-3"
      value="Logout"
      @click="handleLogout"
    />
  </nav>
  <!-- Router view for rendering different components based on the current route -->
  <router-view />
</template>

<script setup lang="ts">
// Import necessary functions and components
import { useAuthStore } from "@/stores/auth"; // Import AuthStore for managing authentication state
import { useRouter } from "vue-router"; // Import useRouter for programmatic navigation

// Access AuthStore and useRouter using the setup function
const authStore = useAuthStore(); // Access AuthStore for authentication-related actions
const router = useRouter(); // Access useRouter for navigating between routes

// Function to handle user logout
const handleLogout = async () => {
  // Call the logout method from the AuthStore to clear authentication state
  await authStore.logout();
  // Redirect to the login page after logout
  if (!authStore.token) {
    router.push("/login");
  }
};
</script>

<style scoped>
/* Scoped CSS styles for the component */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
