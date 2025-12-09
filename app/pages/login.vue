<template>
    <div class="auth-layout">
        <section class="auth-left">
        <div class="auth-left-inner">
            <h1 class="auth-title">Sign In</h1>
            <p class="auth-subtitle">
                Get started by logging into your account and unlock full access
                to our collection of tools and IoT devices.
            </p>

            <div v-if="props.status" class="status-banner">
            {{ props.status }}
            </div>

            <form @submit.prevent="handleLogin" class="auth-form">
            <div class="field">
                <label class="field-label" for="email">Email</label>
                <div class="field-input-wrapper">
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="field-input"
                    placeholder="Enter your Email"
                    required
                    autocomplete="email"
                />
                </div>
            </div>

            <div class="field">
                <label class="field-label" for="password">Password</label>
                <div class="field-input-wrapper">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    name="password"
                    class="field-input"
                    placeholder="Enter your Password"
                    required
                    autocomplete="current-password"
                />

                <button
                    type="button"
                    class="toggle-password"
                    @click="togglePassword"
                    aria-label="Toggle password visibility"
                >
                    <img
                    :src="showPassword ? '/download-1.svg' : '/download.svg'"
                    alt="toggle password"
                    />
                </button>
                </div>
            </div>

            <div v-if="error" class="error-message" style="margin-bottom: 12px;">
                {{ error }}
            </div>

            <button
                type="submit"
                class="auth-btn"
                :disabled="loading"
                data-test="login-button"
            >
                <span v-if="loading" class="auth-btn-spinner"></span>
                <span>Sign In</span>
            </button>

            <p class="auth-small">
                Don't have an account?
                <NuxtLink to="/register">Sign up</NuxtLink>
            </p>
            </form>
        </div>
        </section>

        <aside class="auth-right">
        <div class="brand-top">
            <div class="brand-logo-row">
            <div class="brand-logo">
                <img src="/app_icon.svg" alt="TinkerKit" />
            </div>
            <div class="brand-name">TinkerKit</div>
            </div>

            <h2 class="brand-heading">
            One Place for All Your<br />
            IoT Device Needs
            </h2>
        </div>

        <div class="brand-bottom">
            Experiencing issues?<br />
            Get assistance via akmazzura@upi.edu
        </div>
        </aside>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import '../assets/css/Login.css'

const props = defineProps<{
  status?: string
  canResetPassword?: boolean
  canRegister?: boolean
}>()

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password
      }
    })

    if (response.success) {
      await navigateTo('/inventory')
    } else {
      error.value = response.message || 'Login failed'
    }
  } catch (err: any) {
    console.error('Login error:', err)
    error.value = err?.data?.message || err?.message || 'An error occurred during login'
  } finally {
    loading.value = false
  }
}

useHead({
        title: "login tinkerkit",
        link: [
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
            },
        ],
    });
</script>