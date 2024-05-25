<template>
  <div class="login shadow my-5">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" v-model="username" id="username" aria-describedby="usernameHelp" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await authStore.login(username.value, password.value);
      if (authStore.token) {
        router.push("/");
      } else {
        alert("Login failed");
      }
    };

    return {
      username,
      password,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.login {
  max-width: 600px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login div {
  margin-bottom: 1em;
}

</style>
