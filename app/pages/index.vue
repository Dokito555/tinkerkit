<template>
    <div>
        <header class="hero-section" id="home">
        <div class="container topbar">
            <div class="logo">
            <img
                src="/app_icon.svg"
                alt="TinkerKit logo"
                class="logo-square"
            />
            <span class="logo-text">TinkerKit</span>
            </div>

            <nav class="nav" :class="{ 'nav-open': isNavOpen }">
            <a href="/inventory">Inventory</a>
            <a href="#about">About us</a>
            <a href="#membership">Membership</a>
            <a href="#faq">FAQ</a>
            </nav>

            <img
            src="/app_icon.svg"
            alt=""
            class="nav-square"
            />

            <button
            class="nav-toggle"
            aria-label="Toggle navigation"
            @click="toggleNav"
            >
            ☰
            </button>
        </div>

        <div class="container hero">
            <div class="hero-left">
            <h1>
                The all-in-one platform for discovering, borrowing, and managing IoT
                devices—everything you need, all in one place.
            </h1>
            <p class="hero-tagline">
                One Place for All Your IoT Device Needs.
            </p>
            <button class="btn btn-primary">Check out our Inventory</button>
            </div>

            <div class="hero-right">
            <div class="hero-image-wrap">
                <div class="hero-orange-rect"></div>

                <img
                src="/image_5.png"
                alt="IoT board"
                class="hero-board-img"
                />
            </div>
            </div>
        </div>
        </header>

        <section class="mini-tagline">
        <p>One Place for All Your IoT Device Needs.</p>
        </section>

        <section class="iot-panel" id="inventory">
        <div class="container panel-inner">
            <div class="panel-text">
            <h2>
                All Your IoT<br />
                Devices, One<br />
                Platform
            </h2>
            <p>
                One place to access, borrow, and manage every IoT device you need,
                with real-time status tracking and a seamless borrowing process.
            </p>
            <button class="btn btn-borrow">Borrow Now</button>
            </div>

            <div class="panel-graphic">
            <div class="iot-icon">
                <img src="/Vector.svg" alt="" />
            </div>
            <p class="iot-label">Internet of Things</p>
            </div>
        </div>
        </section>

        <section class="stats">
        <div class="container stats-grid">
            <div class="stat-card">
            <div class="stat-main">
                <span class="stat-number">50</span>
                <span class="stat-arrow">›</span>
            </div>
            <div class="stat-label">Pending Request</div>
            </div>

            <div class="stat-card">
            <div class="stat-main">
                <span class="stat-number">100</span>
                <span class="stat-arrow">›</span>
            </div>
            <div class="stat-label">Active loans</div>
            </div>

            <div class="stat-card">
            <div class="stat-main">
                <span class="stat-number">500</span>
                <span class="stat-arrow">›</span>
            </div>
            <div class="stat-label">Total Devices and Tools</div>
            </div>

            <div class="stat-card">
            <div class="stat-main">
                <span class="stat-number">100</span>
            </div>
            <div class="stat-label">Satisfied Users</div>
            </div>
        </div>
        </section>

        <section class="about" id="about">
        <div class="container about-title-wrap">
            <span class="about-title">About Us</span>
        </div>

        <div class="container about-grid">
            <div class="about-card about-icon-card">
            <div class="people-icon">
                <img src="/Vectorpeople.png" alt="" />
            </div>
            </div>

            <div class="about-card about-text-card">
            <h3>Who We Are</h3>
            <p>
                We are dedicated to making access to cutting-edge IoT devices
                simple, efficient, and reliable. Our platform was built to help
                students, researchers, and professionals easily borrow tools and
                equipment for their projects without the hassle of manual
                coordination. By centralizing the lending process in one place, we
                aim to support innovation, collaboration, and hands-on learning in
                modern technology fields.
            </p>
            </div>
        </div>
        </section>

        <section class="mission" id="membership">
        <div class="container mission-grid">
            <div class="mission-card mission-text-card">
            <h3>Our Mission</h3>
            <p>
                Our mission is to create a seamless borrowing experience that
                combines smart technology with intuitive design. Whether you’re
                reserving a device for a class experiment, testing a prototype, or
                conducting advanced research, our system ensures that every
                transaction is transparent, organized, and secure. With a commitment
                to trust, accountability, and continuous improvement, we’re here to
                empower every user to focus on what matters most — building the
                future.
            </p>
            </div>
            <div class="mission-card mission-icon-card">
            <div class="target-icon">
                <img src="/Group.png" alt="" />
            </div>
            </div>
        </div>
        </section>

        <footer class="footer" id="faq">
        <div class="container footer-top">
            <div class="footer-left">
            <div class="logo footer-logo">
                <img
                src="/app_icon.svg"
                alt="TinkerKit logo"
                class="logo-square"
                />
                <span class="logo-text">TinkerKit</span>
            </div>
            <p class="footer-tagline">
                One Place for All Your IoT Device Needs.
            </p>

            <div class="social-row">
                <img
                src="/mingcute_instagram-fill.svg"
                alt="social icon"
                class="social-img"
                />
                <img
                src="/ic_baseline-twitter.svg"
                alt="social icon"
                class="social-img"
                />
                <img
                src="/ic_baseline-email.svg"
                alt="social icon"
                class="social-img"
                />
                <img
                src="/ic_baseline-discord.svg"
                alt="social icon"
                class="social-img"
                />
                <img
                src="/ri_whatsapp-fill.svg"
                alt="social icon"
                class="social-img"
                />
            </div>

            <p class="footer-small">Experiencing Issues?</p>
            <p class="footer-small">
                Get assistance via
                <a href="mailto:akmazzura@upi.edu">akmazzura@upi.edu</a>
            </p>
            </div>

            <div class="footer-right">
            <div class="footer-col">
                <h4>Overview</h4>
                <a href="#home">Home</a>
                <a href="#inventory">Inventory</a>
                <a href="#about">About Date</a>
                <a href="#membership">Membership</a>
                <a href="#faq">FAQ</a>
            </div>
            <div class="footer-col">
                <h4>User</h4>
                <a href="#">Profile</a>
                <a href="#">Borrow Date</a>
                <a href="#">Due Date</a>
            </div>
            <div class="footer-col">
                <h4>Our Location</h4>
                <p>
                Jl. Pendidikan No.15, Cibiru Wetan, Kec. Cileunyi,<br />
                Kabupaten Bandung, Jawa Barat 40625
                </p>
            </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container footer-bottom-inner">
            <span>Ⓒ 2025 TinkerKit</span>
            <a href="#">Privacy Policy</a>
            </div>
        </div>
        </footer>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import '../assets/css/landing.css'

    const isNavOpen = ref(false)

    const toggleNav = () => {
        isNavOpen.value = !isNavOpen.value
    }
</script>