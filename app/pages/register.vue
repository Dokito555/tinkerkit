<template>
    <div class="auth-layout">
        <section class="auth-left">
        <div class="auth-left-inner">
            <h1 class="auth-title">Sign Up</h1>
            <p class="auth-subtitle">
                Get started by creating your account and unlock full access to our
                collection of tools and IoT devices.
            </p>

            <!-- <Form @submit.prevent="handleRegister" :reset-on-success="['password']" v-slot="{ errors, processing }" class="auth-form"> -->
            <Form @submit.prevent="handleRegister" class="auth-form">
            <div class="field">
                <label class="field-label" for="email">Email</label>
                <div class="field-input-wrapper">
                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="field-input"
                    placeholder="Enter your Email"
                    required
                    name="email"
                    autocomplete="email"
                />
            </div>
                <!-- prioritize Inertia errors, then server-side validation from fetch -->
                <!-- <InputError :message="errors.email || fieldErrors.email" /> -->
            </div>

            <div class="field">
                <label class="field-label" for="password">Password</label>
                <div class="field-input-wrapper">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="form.password"
                    class="field-input"
                    placeholder="Enter your Password"
                    required
                    name="password"
                    autocomplete="new-password"
                    minlength="6"
                />

                <button
                    type="button"
                    class="toggle-password"
                    @click="togglePassword"
                >
                    <img
                    :src="
                        showPassword ? '/Auth/download-1.svg' : '/Auth/download.svg'
                    "
                    alt="toggle password"
                    />
                </button>
                </div>
                <!-- <InputError :message="errors.password || fieldErrors.password" /> -->
            </div>

            <div class="field">
                <label class="field-label" for="confirmPassword"
                >Confirm Password</label
                >
                <div class="field-input-wrapper">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    class="field-input"
                    placeholder="Confirm your Password"
                    required
                    name="confirmPassword"
                    minlength="6"
                />
                </div>
                <!-- <InputError :message="fieldErrors.confirmPassword" /> -->
            </div>

            <div v-if="error" class="error-message" style="margin-bottom: 12px">
                {{ error }}
            </div>

            <div
                v-if="success"
                class="success-message"
                style="margin-bottom: 12px"
            >
                {{ success }}
            </div>

            <button
                type="submit"
                class="auth-btn"
                data-test="register-user-button"
            >
                <!-- <span v-if="processing || loading" class="auth-btn-spinner" /> -->
                <span>Create account</span>
            </button>

            <p class="auth-small">
                Already have an account?
                <NuxtLink to="/login">Sign in</NuxtLink>
            </p>
            </Form>
        </div>
    </section>

        <aside class="auth-right">
        <div class="brand-top">
            <div class="brand-logo-row">
            <div class="brand-logo shadow-logo">
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
    import { ref } from "vue";
    import "../assets/css/register.css";

    const showPassword = ref(false);
    const togglePassword = () => {
        showPassword.value = !showPassword.value;
    };

    const form = ref({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const loading = ref(false);
    const error = ref("");
    const success = ref("");
    const fieldErrors = ref<Record<string, any>>({});

    const handleRegister = async () => {
    loading.value = true;
    error.value = "";
    success.value = "";
    fieldErrors.value = {};

    if (form.value.password !== form.value.confirmPassword) {
        error.value = "Passwords do not match";
        loading.value = false;
        return;
    }

    try {
        const response: any = await $fetch("/api/auth/register", {
        method: "POST",
        body: {
            email: form.value.email,
            password: form.value.password,
        },
        });

        if (response.success) {
        success.value = "Account created successfully! Redirecting...";

        setTimeout(() => {
            navigateTo("/login");
        }, 2000);
        } else {
        error.value = response.message || "Registration failed";
        }
    } catch (err: any) {
        console.error("Register error:", err);
        error.value = err.data?.message || "An error occurred during registration";
    } finally {
        loading.value = false;
    }
    };

    useHead({
        title: "register tinkerkit",
        link: [
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
            },
        ],
    });
</script>
