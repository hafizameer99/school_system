import { createRouter, createWebHistory } from "vue-router"; // Import necessary functions from Vue Router
import Login from "../components/Login.vue"; // Import Login component
import SchoolStats from "../components/SchoolStats.vue"; // Import SchoolStats component
import { useAuthStore } from "../stores/auth"; // Import AuthStore for managing authentication state

// Define routes for the application
const routes = [
  {
    path: "/login", // Route path for login page
    name: "Login", // Route name
    component: Login, // Component to render for this route
    meta: { requiresGuest: true }, // Meta information for route guarding
  },
  {
    path: "/stats", // Route path for school statistics page
    name: "SchoolStats", // Route name
    component: SchoolStats, // Component to render for this route
    meta: { requiresAuth: true }, // Meta information for route guarding
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use web history mode
  routes, // Pass defined routes to the router
});

// Route guard: beforeEach navigation guard to check authentication state before navigating to protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access AuthStore for authentication-related actions

  // If route requires authentication and user is not authenticated (no token)
  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.token) {
    next("/login"); // Redirect to login page
  } 
  // If route requires guest (unauthenticated user) and user is authenticated (has token)
  else if (to.matched.some((record) => record.meta.requiresGuest) && authStore.token) {
    next("/stats"); // Redirect to home page or another appropriate route
  } 
  // If no authentication or guest requirements for the route, proceed with navigation
  else {
    next(); // Continue with navigation
  }
});

export default router; // Export the configured router for use in the application
