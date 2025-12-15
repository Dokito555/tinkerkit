<template>
  <div class="inventory-page">
    <!-- ================= NAVBAR ================= -->
    <header class="navbar">
      <div class="nav-inner">
        <div class="nav-left">
          <div class="logo-box">
            <!-- <img src="@/assets/Rectangle-391.svg" alt="TinkerKit" /> -->
          </div>
          <span class="logo-text">TinkerKit</span>
        </div>

        <nav class="nav-menu">
          <a href="#inventory" class="nav-link active">Inventory</a>
          <a href="#about" class="nav-link">About us</a>
          <a href="#membership" class="nav-link">Membership</a>
          <a href="#faq" class="nav-link">FAQ</a>
        </nav>

        <div class="nav-right-square"></div>
      </div>
    </header>

    <!-- ================= CONTENT ================= -->
    <main class="inventory-main">
      <div class="inventory-inner">

        <!-- ========== SIDEBAR FILTER ========== -->
        <aside class="filter-sidebar">
          <div class="filter-card">
            <h3 class="filter-title">Category</h3>
            <ul class="filter-list">
              <li v-for="cat in categories" :key="cat">
                <label class="filter-item">
                  <span>{{ cat }}</span>
                  <span class="filter-checkbox"></span>
                </label>
              </li>
            </ul>

            <h3 class="filter-title filter-title-spaced">Availability</h3>
            <ul class="filter-list">
              <li>
                <label class="filter-item">
                  <span>Available Now</span>
                  <span class="filter-checkbox"></span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        <!-- ========== LIST + SEARCH ========== -->
        <section class="inventory-content">
          <!-- search bar -->
          <div class="search-bar-wrapper">
            <div class="search-bar">
              <span class="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search"
                v-model="search"
              />
            </div>
          </div>

          <!-- product grid -->
          <div class="card-grid">
            <article
              v-for="(item, index) in filteredItems"
              :key="index"
              class="item-card"
            >
              <div class="item-img-wrap">
                <!-- ganti src sesuai aset kamu -->
                <img :src="item.img" :alt="item.name" />
              </div>
              <div class="item-info">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-category">{{ item.category }}</p>
                <p
                  class="item-status"
                  :class="{ 'item-status-unavailable': !item.available }"
                >
                  {{ item.available ? 'Available Now' : 'Unavailable' }}
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="site-footer">
      <div class="footer-inner">
        <!-- left -->
        <div class="footer-left">
          <div class="footer-logo-row">
            <div class="footer-logo-box">
              <!-- <img src="@/assets/Rectangle-391.svg" alt="TinkerKit" /> -->
            </div>
            <div class="footer-logo-text">TinkerKit</div>
          </div>
          <p class="footer-tagline">One Place for All Your IoT Device Needs.</p>

          <div class="footer-social">
            <!-- ganti src icon sesuai aset kamu -->
            <!-- <img src="@/assets/icon-instagram.svg" alt="Instagram" />
            <img src="@/assets/icon-twitter.svg" alt="Twitter" />
            <img src="@/assets/icon-email.svg" alt="Email" />
            <img src="@/assets/icon-discord.svg" alt="Discord" />
            <img src="@/assets/icon-whatsapp.svg" alt="WhatsApp" /> -->
          </div>
        </div>

        <!-- middle columns -->
        <div class="footer-columns">
          <div class="footer-col">
            <h4>Overview</h4>
            <a href="#">Home</a>
            <a href="#">Inventory</a>
            <a href="#">About Date</a>
            <a href="#">Membership</a>
            <a href="#">FAQ</a>
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
              Jl. Pendidikan No.15, Cibiru<br />
              Wetan, Kec. Cileunyi,<br />
              Kabupaten Bandung, Jawa<br />
              Barat 40625
            </p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2025 TinkerKit</span>
        <a href="#" class="footer-privacy">Privacy Policy</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
// data dummy, bisa kamu ganti dari API nanti
const categories = [
  'Microcontrollers & Boards',
  'Sensors & Modules',
  'Actuators & Output Devices',
  'Networking & Connectivity',
  'Tools',
  'Power & Batteries',
  'Finished Devices'
];

const items = [
  {
    name: 'Leonardo R3',
    category: 'Microcontroller & Boards',
    available: true,
    img: '@/assets/inventory/arduino-1.png'
  },
  {
    name: 'Leonardo R4',
    category: 'Microcontroller & Boards',
    available: false,
    img: '@/assets/inventory/arduino-1.png'
  },
  {
    name: 'Leonardo R3',
    category: 'Microcontroller & Boards',
    available: true,
    img: '@/assets/inventory/arduino-1.png'
  },
  {
    name: 'Leonardo R3',
    category: 'Microcontroller & Boards',
    available: true,
    img: '@/assets/inventory/arduino-1.png'
  },
  // kamu bisa lanjutkan sendiri sampai mirip jumlah kartu di desain
];

import { computed, ref } from 'vue';

const search = ref('');

const filteredItems = computed(() => {
  if (!search.value) return items;
  const s = search.value.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(s) ||
      item.category.toLowerCase().includes(s)
  );
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');

.inventory-page {
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
}

/* ============ NAVBAR ============ */
.navbar {
  background: #1f3fb5;
  color: #fff;
  padding: 18px 40px;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-box {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-text {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 32px;
  font-size: 14px;
  font-weight: 500;
}

.nav-link {
  position: relative;
  opacity: 0.9;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
}

.nav-link:hover {
  opacity: 1;
}

.nav-right-square {
  width: 32px;
  height: 32px;
  background: #d9d9d9;
}

/* ============ MAIN CONTENT ============ */
.inventory-main {
  flex: 1;
  padding: 32px 40px 72px;
}

.inventory-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
}

/* SIDEBAR */
.filter-sidebar {
  min-width: 220px;
}

.filter-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 24px 28px;
  box-shadow: 0 10px 45px rgba(15, 23, 42, 0.06);
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.filter-title-spaced {
  margin-top: 24px;
}

.filter-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.filter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: #4b5563;
  padding: 6px 0;
}

.filter-checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #d1d5db;
}

/* CONTENT AREA */
.inventory-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* search bar */
.search-bar-wrapper {
  background: #ffffff;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 10px 45px rgba(15, 23, 42, 0.06);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border-radius: 999px;
  padding: 10px 16px;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 14px;
}

.search-icon {
  font-size: 14px;
}

/* product grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.item-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 18px 20px;
  box-shadow: 0 10px 45px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-img-wrap {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-info {
  font-size: 12px;
}

.item-name {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
  color: #111827;
}

.item-category {
  color: #9ca3af;
  margin-bottom: 2px;
}

.item-status {
  color: #10b981;
  font-weight: 500;
}

.item-status-unavailable {
  color: #f97316;
}

/* ============ FOOTER ============ */
.site-footer {
  background: #1f3fb5;
  color: #e5e7eb;
  padding: 40px 40px 20px;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  gap: 48px;
}

.footer-left {
  max-width: 260px;
}

.footer-logo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.footer-logo-box {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.footer-logo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer-logo-text {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.footer-tagline {
  font-size: 12px;
  margin-bottom: 16px;
}

.footer-social {
  display: flex;
  gap: 10px;
  align-items: center;
}

.footer-social img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* columns */
.footer-columns {
  display: flex;
  gap: 60px;
  font-size: 12px;
}

.footer-col h4 {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}

.footer-col a {
  display: block;
  color: #e5e7eb;
  margin-bottom: 6px;
  text-decoration: none;
}

.footer-col a:hover {
  text-decoration: underline;
}

.footer-col p {
  line-height: 1.5;
}

/* bottom row */
.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 10px;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-privacy {
  color: #e5e7eb;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 1024px) {
  .inventory-inner {
    grid-template-columns: 1fr;
  }
  .filter-sidebar {
    order: -1;
  }
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .footer-columns {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding-inline: 20px;
  }
  .inventory-main {
    padding: 24px 20px 60px;
  }
  .card-grid {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    flex-direction: column;
  }
  .footer-columns {
    flex-direction: column;
  }
}
</style>