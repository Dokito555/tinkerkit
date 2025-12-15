<template>
  <div class="page">
    <header class="header">
      <div class="header__inner container">
        <div class="brand">
          <img :src="logoHeader" alt="TinkerKit" class="brand__logo" />
          <span class="brand__name">TinkerKit</span>
        </div>

        <nav class="nav">
          <RouterLink to="/inventory" class="nav__link">Inventory</RouterLink>
          <RouterLink to="/about" class="nav__link">About us</RouterLink>
          <RouterLink to="/membership" class="nav__link">Membership</RouterLink>
          <RouterLink to="/faq" class="nav__link">FAQ</RouterLink>
        </nav>

        <button class="header__avatar" type="button" aria-label="User menu">
            <img :src="logoHeader" alt="User Avatar" />
        </button>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="layout">
          <aside class="side">

            <div class="side__card">
              <div class="side__section">
                <div class="side__title">Personal Information</div>
                <RouterLink
                  to="/profile"
                  class="side__item"
                  :class="{ 'is-active': isActive('/profile') }"
                >
                  Profile
                </RouterLink>
              </div>

              <div class="side__section">
                <div class="side__title">Loans</div>
                <RouterLink
                  to="/myloans"
                  class="side__item is-muted"
                  :class="{ 'is-active': isActive('/myloans') }"
                >
                  My Loans
                </RouterLink>
              </div>

              <div class="side__section">
                <div class="side__title">Settings</div>
                <RouterLink
                  to="/settings"
                  class="side__item is-muted"
                  :class="{ 'is-active': isActive('/settings') }"
                >
                  Settings
                </RouterLink>
              </div>

              <button class="side__logout-btn" type="button" @click="onLogout">
                Logout
            </button>
            </div>
          </aside>

          <section class="content">
            <div class="panel">
              <div class="panel__head">
                <div class="panel__title">Profile</div>
                <div class="panel__subtitle">Your Personal Information</div>
              </div>

              <div class="profile">
                <div class="profile__avatar">
                  <img :src="avatar" alt="Avatar" />
                </div>

                <div class="profile__info">
                  <div class="profile__name">{{ fullName }}</div>
                  <div class="profile__tier">{{ membership }}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <div class="brand">
            <img :src="logoFooter" alt="TinkerKit" class="brand__logo" />
            <span class="brand__name">TinkerKit</span>
          </div>

          <p class="footer__tagline">One Place for All Your IoT Device Needs.</p>

          <div class="social">
            <a href="#" aria-label="Instagram" class="social__btn"><img :src="iconIg" alt="" /></a>
            <a href="#" aria-label="Twitter" class="social__btn"><img :src="iconTw" alt="" /></a>
            <a href="#" aria-label="Email" class="social__btn"><img :src="iconEmail" alt="" /></a>
            <a href="#" aria-label="Discord" class="social__btn"><img :src="iconDiscord" alt="" /></a>
            <a href="#" aria-label="WhatsApp" class="social__btn"><img :src="iconWa" alt="" /></a>
          </div>
        </div>

        <div class="footer__links">
          <div class="footer__col">
            <a href="#">Home</a>
            <a href="#">Inventory</a>
            <a href="#">About us</a>
            <a href="#">Membership</a>
            <a href="#">FAQ</a>
          </div>
          <div class="footer__col">
            <a href="#">Profile</a>
            <a href="#">Active Loans</a>
            <a href="#">Due Date</a>
            <a href="#">Active Date</a>
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
import { useRoute, useRouter } from 'vue-router'


const logoHeader = '/app_icon.svg'
const logoFooter = '/app_icon.svg'

const iconIg      = '/Myloans/vectori112-gyg.svg'
const iconTw      = '/Myloans/vectori112-mlg7.svg'
const iconEmail   = '/Myloans/icbaselineemaili112-teli.svg'
const iconDiscord = '/Myloans/icbaselinediscordi112-t8e9.svg'
const iconWa      = '/Myloans/riwhatsappfilli112-cza4.svg'

const avatar = '/Profile/rectangle4511286-p1wh-200h.png'

const fullName = 'Muhammad Azzura Al Karazi'
const membership = 'Gold Membership'

const route = useRoute()
const router = useRouter()

function isActive(path) {
  return route.path === path
}

function onLogout() {
  router.push('/login')
}
</script>

<style scoped>
.page{
  min-height:100vh;
  background:#f9fafb;
  color:#111827;
  font-family:Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 20px;}
img{max-width:100%;height:auto;display:block;}

.header{background:#1e40af;position:sticky;top:0;z-index:10;}
.header__inner{
  position:relative;
  height:72px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
}
.brand{display:flex;align-items:center;gap:12px;flex:0 0 auto;}
.brand__logo{ border-radius:20px; object-fit:cover; }
.brand__name{color:#fff;font-weight:700;font-size:24px;line-height:1;white-space:nowrap;}

.nav{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  align-items:center;
  gap:32px;
  white-space:nowrap;
}
.nav__link{color:#fff;font-weight:600;font-size:14px;opacity:.95;}
.nav__link:hover{opacity:1;text-decoration:underline;}

.header__avatar{
  border-radius:10px;
  background: transparent;  
  padding:0;
  border:none;
}

.main{padding:28px 0 36px;}
.layout{
  display:grid;
  grid-template-columns:323px 1fr;
  gap:24px;
  align-items:start;
}

.side__card{
  background:#fff;
  border-radius:20px;
  padding:20px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.side__section{margin-bottom:22px;}
.side__title{font-size:18px;font-weight:500;margin-bottom:10px;}
.side__item{
  display:block;
  padding:10px 12px;
  border-radius:10px;
  font-size:14px;
  font-weight:400;         
  color:#111827;
}
.side__item.is-muted{color:#9ca3af;}
.side__item.is-active{
  background:#efefef;       
  font-weight:400;          
  color:#111827;
}

.side__logout-btn {
  margin-top: 32px;
  width: 100%;
  height: 56px;
  background: #273ea5;       
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}

.side__logout-btn:hover {
  filter: brightness(1.05);
}

.side__logout-btn:active {
  transform: translateY(2px);
  box-shadow: 0 4px 0 #0f1f6b;
}

.panel{
  background:#fff;
  border-radius:20px;
  min-height:814px; 
  padding:24px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.panel__head{margin-bottom:18px;}
.panel__title{font-size:20px;font-weight:500;}
.panel__subtitle{margin-top:4px;font-size:14px;color:#9ca3af;font-weight:500;}

.profile{
  display:flex;
  gap:24px;
  align-items:flex-start;
  padding-top:10px;
}
.profile__avatar{
  width:170px;
  height:170px;
  background:#e5e7eb;
  border-radius:6px;
  overflow:hidden;
  flex:0 0 auto;
}
.profile__avatar img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.profile__info{padding-top:20px;}
.profile__name{
  font-size:22px;
  font-weight:400;
}
.profile__tier{
  margin-top:8px;
  font-size:14px;
  font-weight:400;
  color:#111827;
}

.footer{margin-top:28px;background:#1e40af;color:#fff;padding:40px 0;}
.footer__inner{display:grid;grid-template-columns:1.2fr 1fr;gap:26px;}
.footer__tagline{margin-top:10px;opacity:.95;font-size:14px;line-height:1.5;}
.social{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;}
.social__btn{width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.12);display:grid;place-items:center;}
.social__btn img{width:22px;height:22px;}
.social__btn:hover{background:rgba(255,255,255,.18);}

.footer__links{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-content:start;}
.footer__col{display:grid;gap:8px;font-size:14px;}
.footer__col a{opacity:.95;}
.footer__col a:hover{opacity:1;text-decoration:underline;}

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

@media (max-width: 992px){
  .layout{grid-template-columns:1fr;}
  .nav{display:none;}
  .footer__inner{grid-template-columns:1fr;}
  .panel{min-height:auto;}
}
</style>