<template>
  <div class="page">
    <header class="header">
      <div class="container header__inner">
        <div class="brand">
          <img :src="assets.headerLogo" class="brand__logo" alt="TinkerKit" />
          <span class="brand__name">TinkerKit</span>
        </div>

        <nav class="nav">
          <a href="#" class="nav__link is-active">Inventory</a>
          <a href="#" class="nav__link">About us</a>
          <a href="#" class="nav__link">Membership</a>
          <a href="#" class="nav__link">FAQ</a>
        </nav>

        <button class="header__avatar" type="button" aria-label="User menu"></button>
      </div>
    </header>

    <main class="main">
      <div class="container inventory-layout">
        <aside class="side">
          <div class="side__card">
            <div class="side__section">
              <div class="side__title">Category</div>

              <ul class="check-list">
                <li v-for="cat in categories" :key="cat">
                  <label class="check-item">
                    <span class="check-text">{{ cat }}</span>

                    <input
                      class="check-input"
                      type="checkbox"
                      :value="cat"
                      v-model="selectedCategories"
                    />
                    <span class="check-box" aria-hidden="true"></span>
                  </label>
                </li>
              </ul>
            </div>

            <div class="side__section">
              <div class="side__title">Availability</div>

              <label class="check-item">
                <span class="check-text">Available Now</span>

                <input class="check-input" type="checkbox" v-model="availableOnly" />
                <span class="check-box" aria-hidden="true"></span>
              </label>
            </div>
          </div>
        </aside>

        <section class="content">
          <div class="search-card">
            <div class="search">
              <img :src="assets.searchIcon" class="search-ico" alt="" />
              <input v-model="search" type="text" placeholder="Search" />
            </div>
          </div>

          <div class="grid">
            <article v-for="item in filteredItems" :key="item.id" class="item-card">
              <div class="item-img">
                <img :src="item.img" :alt="item.name" />
              </div>

              <div class="item-info">
                <h4 class="item-name">{{ item.name }}</h4>
                <p class="item-category">{{ item.category }}</p>
                <p class="item-status" :class="{ off: !item.available }">
                  {{ item.available ? 'Available Now' : 'Unavailable' }}
                </p>
              </div>

              <button class="btn" :disabled="!item.available" @click="requestItem(item)">
                Request
              </button>
            </article>

            <div v-if="filteredItems.length === 0" class="empty">
              No items found.
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer">
      <img :src="assets.footerBg" alt="" class="footer__bg" />

      <div class="container footer__inner">
        <div class="footer__brand">
          <div class="brand brand--footer">
            <img :src="assets.footerLogo" class="brand__logo" alt="TinkerKit" />
            <span class="brand__name">TinkerKit</span>
          </div>

          <p class="footer__tagline">One Place for All Your IoT Device Needs.</p>

          <div class="social">
            <a href="#" class="social__btn" aria-label="Instagram">
              <img :src="assets.ig" alt="" />
            </a>
            <a href="#" class="social__btn" aria-label="Twitter">
              <img :src="assets.tw" alt="" />
            </a>
            <a href="#" class="social__btn" aria-label="Email">
              <img :src="assets.email" alt="" />
            </a>
            <a href="#" class="social__btn" aria-label="Discord">
              <img :src="assets.discord" alt="" />
            </a>
            <a href="#" class="social__btn" aria-label="WhatsApp">
              <img :src="assets.wa" alt="" />
            </a>
          </div>
        </div>

        <div class="footer__links">
          <div class="footer__col">
            <a href="#">Home</a>
            <a href="#">Inventory</a>
            <a href="#">About Date</a>
            <a href="#">Membership</a>
            <a href="#">FAQ</a>
          </div>
          <div class="footer__col">
            <a href="#">Profile</a>
            <a href="#">Borrow Date</a>
            <a href="#">Due Date</a>
          </div>
          <div class="footer__col footer__loc">
            <div class="footer__locTitle">Our Location</div>
            <p>
              Jl. Pendidikan No.15, Cibiru Wetan, Kec. Cileunyi, Kabupaten Bandung,
              Jawa Barat 40625
            </p>
          </div>
        </div>

        <div class="footer__bottom">
          <span>Ⓒ 2025 TinkerKit</span>
          <a href="#" class="footer__privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'


const assets = {
  footerBg: '/Inventory/rectangle4031410-l8vg-1500w.png',

  headerLogo: '/Inventory/rectangle3941415-e7l4-200h.png',
  footerLogo: '/Inventory/rectangle3941428-di2-200h.png',

  ig: '/Inventory/vector1434-hrt.svg',
  tw: '/Inventory/vector1438-qg5en.svg',
  email: '/Inventory/icbaselineemail1439-cko4.svg',
  discord: '/Inventory/icbaselinediscord1441-406q.svg',
  wa: '/Inventory/riwhatsappfill1443-1d7a.svg',

  searchIcon: '/Inventory/weuisearchfilled1479-2wgv.svg',
}

const categories = [
  'Microcontrollers & Boards',
  'Sensors & Modules',
  'Actuators & Output Devices',
  'Networking & Connectivity',
  'Tools',
  'Power & Batteries',
  'Finished Devices',
]

const items = [
  { id: 1, name: 'Leonardo R3', category: 'Microcontrollers & Boards', available: true,  img: '/Inventory/image111485-6wwn-200h.png' },
  { id: 2, name: 'Leonardo R3', category: 'Microcontrollers & Boards', available: false, img: '/Inventory/image101492-b7t-200h.png' },
  { id: 3, name: 'Leonardo R3', category: 'Microcontrollers & Boards', available: true,  img: '/Inventory/image101499-i4i8-200h.png' },

  { id: 4, name: 'Micro Servo SG90', category: 'Actuators & Output Devices', available: true, img: '/Inventory/image101508-dwdf-200h.png' },
  { id: 5, name: 'Micro Servo SG90', category: 'Actuators & Output Devices', available: true, img: '/Inventory/image101516-cjmo-200h.png' },
  { id: 6, name: 'Micro Servo SG90', category: 'Actuators & Output Devices', available: true, img: '/Inventory/image101524-xxwo-200h.png' },
]

const search = ref('')
const selectedCategories = ref([])
const availableOnly = ref(false)

const filteredItems = computed(() => {
  let list = items

  if (selectedCategories.value.length) {
    list = list.filter((it) => selectedCategories.value.includes(it.category))
  }
  if (availableOnly.value) {
    list = list.filter((it) => it.available)
  }

  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (it) => it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q)
    )
  }
  return list
})

function requestItem(item) {
  alert(`Request: ${item.name}`)
}
</script>

<style scoped>
.page{
  min-height:100vh;
  display:flex;
  flex-direction:column;
  background:#f9fafb;
  color:#111827;
  font-family:Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.container{ width:100%; max-width:1200px; margin:0 auto; padding:0 20px; }
img{ display:block; max-width:100%; height:auto; }

.header{ background:#1e40af; position:sticky; top:0; z-index:20; }
.header__inner{
  height:72px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  position:relative;
}
.brand{ display:flex; align-items:center; gap:12px; }
.brand__logo{ width:42px; height:42px; border-radius:10px; object-fit:cover; background:#d9d9d9; }
.brand__name{ color:#fff; font-weight:700; font-size:24px; line-height:1; }

.nav{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  gap:32px;
  white-space:nowrap;
}
.nav__link{ color:#fff; font-weight:600; font-size:14px; opacity:.95; }
.nav__link:hover{ opacity:1; text-decoration:underline; }
.nav__link.is-active{ text-decoration:underline; }

.header__avatar{
  width:42px; height:42px;
  border-radius:10px;
  background:#d9d9d9;
}

.main{ flex:1; padding:28px 0 56px; }
.inventory-layout{
  display:grid;
  grid-template-columns: 323px 1fr;
  gap:24px;
  align-items:start;
}

.side__card{
  background:#fff;
  border-radius:20px;
  padding:20px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.side__section{ margin-bottom:22px; }
.side__title{ font-size:14px; font-weight:700; margin-bottom:12px; }

.check-list{ list-style:none; margin:0; padding:0; display:grid; gap:10px; }
.check-item{ display:flex; align-items:center; justify-content:space-between; gap:12px; cursor:pointer; }
.check-text{ font-size:13px; color:#4b5563; }

.check-input{ position:absolute; opacity:0; pointer-events:none; }
.check-box{
  width:16px; height:16px;
  border-radius:4px;
  border:1.5px solid #d1d5db;
  background:#fff;
  display:inline-grid;
  place-items:center;
  transition:.15s ease;
}
.check-input:checked + .check-box{
  background:#1e40af;
  border-color:#1e40af;
}
.check-input:checked + .check-box::after{
  content:"";
  width:8px; height:4px;
  border-left:2px solid #fff;
  border-bottom:2px solid #fff;
  transform:rotate(-45deg);
  margin-top:-1px;
}

.content{ display:flex; flex-direction:column; gap:18px; }
.search-card{
  background:#fff;
  border-radius:16px;
  padding:12px 14px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.search{
  display:flex; align-items:center; gap:10px;
  background:#f9fafb;
  padding:10px 14px;
  border-radius:999px;
}
.search-ico{ width:18px; height:18px; opacity:.75; }
.search input{ border:none; outline:none; background:transparent; width:100%; font-size:14px; }

.grid{ display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:18px; }
.item-card{
  background:#fff;
  border-radius:16px;
  padding:16px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
  display:flex;
  flex-direction:column;
  gap:12px;
}
.item-img{
  width:100%;
  aspect-ratio: 4 / 3;    
  display:flex;
  align-items:center;
  justify-content:center;
  background:#f9fafb;
  border-radius:12px;
  overflow:hidden;
}
.item-img img{ max-width:100%; max-height:100%; object-fit:contain; }
.item-name{ margin:0; font-size:14px; font-weight:700; }
.item-category{ margin:2px 0 0; font-size:12px; color:#9ca3af; }
.item-status{ margin:6px 0 0; font-size:12px; font-weight:700; color:#10b981; }
.item-status.off{ color:#f97316; }

.btn{
  margin-top:6px;
  height:36px;
  border-radius:10px;
  background:#1e40af;
  color:#fff;
  font-weight:700;
  cursor:pointer;
}
.btn:disabled{ background:#9ca3af; cursor:not-allowed; }
.empty{ grid-column:1 / -1; text-align:center; color:#6b7280; padding:26px 0; }

.footer{
  position:relative;
  background:#1e40af;
  color:#fff;
  padding:40px 0;
}
.footer__bg{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  opacity:1; 
  pointer-events:none;
}
.footer__inner{ position:relative; display:grid; grid-template-columns:1.2fr 1.8fr; gap:26px; }
.brand--footer .brand__name{ color:#fff; }

.footer__tagline{ margin-top:10px; opacity:.95; font-size:14px; line-height:1.5; }

.social{ display:flex; gap:10px; margin-top:14px; flex-wrap:wrap; }
.social__btn{
  width:38px; height:38px;
  border-radius:12px;
  background:rgba(255,255,255,.12);
  display:grid; place-items:center;
}
.social__btn img{ width:22px; height:22px; }

.footer__links{
  display:grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap:18px;
  align-content:start;
}
.footer__col{ display:grid; gap:8px; font-size:14px; }
.footer__col a{ opacity:.95; }
.footer__col a:hover{ opacity:1; text-decoration:underline; }

.footer__locTitle{ font-weight:700; margin-bottom:6px; }
.footer__loc p{ margin:0; opacity:.95; line-height:1.5; }

.footer__bottom{
  grid-column:1 / -1;
  margin-top:10px;
  padding-top:14px;
  border-top:1px solid rgba(255,255,255,.18);
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  font-size:14px;
  opacity:.95;
}
.footer__privacy{ opacity:.95; }
.footer__privacy:hover{ opacity:1; text-decoration:underline; }

@media (max-width: 992px){
  .inventory-layout{ grid-template-columns:1fr; }
  .nav{ display:none; }
  .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .footer__inner{ grid-template-columns:1fr; }
  .footer__links{ grid-template-columns:1fr 1fr; }
}
@media (max-width: 640px){
  .grid{ grid-template-columns:1fr; }
  .footer__links{ grid-template-columns:1fr; }
}
</style>