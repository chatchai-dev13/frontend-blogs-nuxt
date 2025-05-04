<template>
  <div class="container d-flex justify-content-center align-items-center login-container">
    <div class="card shadow p-4" style="min-width: 300px; max-width: 400px; width: 100%;">
      <h3 class="text-center mb-4">Login</h3>
      <form @submit.prevent="fnLogin()">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input v-model="email" id="email" type="email" class="form-control" placeholder="Enter email">
          <small v-if="emailError" class="text-danger">{{ emailError }}</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" id="password" type="password" class="form-control" placeholder="Password">
          <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <div class="mt-3 d-flex justify-content-end">
          <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal"
            data-bs-target="#modal-register">Register</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modal-register" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Register</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="fnRegister()">
          <div class="modal-body">
            <div class="mb-3">
              <label for="reg-name" class="form-label">Name</label>
              <input v-model="reg_name" id="reg-name" type="text" class="form-control" placeholder="Enter name">
              <small v-if="reg_nameError" class="text-danger">{{ reg_nameError }}</small>
            </div>
            <div class="mb-3">
              <label for="reg-email" class="form-label">Email address</label>
              <input v-model="reg_email" id="reg-email" type="email" class="form-control" placeholder="Enter email">
              <small v-if="reg_emailError" class="text-danger">{{ reg_emailError }}</small>
            </div>
            <div class="mb-3">
              <label for="reg-password" class="form-label">Password</label>
              <input v-model="reg_password" id="reg-password" type="password" class="form-control"
                placeholder="Password">
              <small v-if="reg_passwordError" class="text-danger">{{ reg_passwordError }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Register</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useLogin } from "../../composables/useLogin";

definePageMeta({
  layout: 'login'
})

const {
  fnLogin, fnRegister,
  email, emailError, password, passwordError, reg_name, reg_nameError,
  reg_email, reg_password, reg_emailError, reg_passwordError
} = useLogin()

</script>

<style scoped>
body,
html {
  height: 100%;
}

.login-container {
  height: 100vh;
}
</style>