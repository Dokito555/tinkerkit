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
                  class="side__item"
                  :class="{ 'is-active': isActive('/myloans') }"
                >
                  My Loans
                </RouterLink>
              </div>

              <div class="side__section">
                <div class="side__title">Settings</div>
                <RouterLink
                  to="/payments"
                  class="side__item"
                  :class="{ 'is-active': isActive('/settings') }"
                >
                  Settings
                </RouterLink>
              </div>

              <button class="logout" type="button">Logout</button>
            </div>
          </aside>

          <section class="content">
            <div class="content__card">
              <div class="section-head">
                <div class="section-head__title">Payments</div>
                <div class="section-head__sub">Payment details</div>
              </div>

              <div class="options">
                <button class="option" type="button">
                  <div class="option__left">
                    <span class="radio"></span>
                    <span class="option__label">Paypal</span>
                  </div>
                  <img :src="paypalLogo" alt="PayPal" class="option__right-img" />
                </button>

                <button class="option" type="button">
                  <div class="option__left">
                    <span class="radio"></span>
                    <span class="option__label">Credit Card</span>
                  </div>
                  <div class="cards">
                    <img :src="visaLogo" alt="Visa" class="card-img" />
                    <img :src="mastercardLogo" alt="Mastercard" class="card-img" />
                  </div>
                </button>

                <button class="option" type="button">
                  <div class="option__left">
                    <span class="radio"></span>
                    <span class="option__label">Cash</span>
                  </div>
                  <img :src="cashIcon" alt="Cash" class="option__right-img" />
                </button>
              </div>

              <div class="section-head section-head--mt">
                <div class="section-head__title">Light/Dark Mode</div>
                <div class="section-head__sub">Brightness</div>
              </div>

              <div class="options">
                <button class="option" type="button">
                  <div class="option__left">
                    <span class="radio"></span>
                    <span class="option__label">Light Mode</span>
                  </div>
                </button>

                <button class="option" type="button">
                  <div class="option__left">
                    <span class="radio"></span>
                    <span class="option__label">Dark Mode</span>
                  </div>
                </button>
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
import { useRoute } from "vue-router";

const route = useRoute();
const isActive = (path) => route.path === path;

const logoHeader = "/app_icon.svg";
const logoFooter = "/app_icon.svg";

const iconIg = "/Payments/vectori147-emx4.svg";
const iconTw = "/Payments/vectori147-gg3.svg";
const iconEmail = "/Payments/icbaselineemaili147-zyps.svg";
const iconDiscord = "/Payments/icbaselinediscordi147-ndsr.svg";
const iconWa = "/Payments/riwhatsappfilli147-635k.svg";

const paypalLogo = "/Payments/logospaypal172-hfqs.svg";
const visaLogo = "/Payments/logosvisaelectron185-go7y.svg";
const mastercardLogo = "/Payments/logosmastercard187-grf.svg";
const cashIcon = "/Payments/mdicash199-bd6f.svg";
</script>

<style scoped>
.page{
  min-height:100vh;
  background:#f9fafb;
  color:#111827;
  font-family:Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 20px;}
img{max-width:100%;height:auto;display:block}

.header{background:#1e40af;position:sticky;top:0;z-index:10;}
.header__inner{
  position:relative;height:72px;display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.brand{display:flex;align-items:center;gap:12px;flex:0 0 auto;}
.brand__logo{ border-radius:20px; object-fit:cover; }
.brand__name{color:#fff;font-weight:700;font-size:24px;line-height:1;white-space:nowrap;}
.nav{
  position:absolute;left:50%;transform:translateX(-50%);
  display:flex;gap:32px;align-items:center;white-space:nowrap;
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
  background:#fff;border-radius:20px;padding:20px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.side__section{margin-bottom:22px;}
.side__title{font-size:20px;font-weight:500;margin-bottom:10px;}
.side__item{
  display:block;
  font-size:16px;
  color:#9ca3af;
  padding:8px 0;
}
.side__item:hover{color:#111827;}
.side__item.is-active{
  color:#111827;
  font-weight:400;
  text-decoration: underline;
  text-underline-offset: 6px;
}

.logout{
  width:100%;height:50px;border-radius:10px;background:#1e40af;color:#fff;
  font-size:16px;font-weight:500;cursor:pointer;
}
.logout:hover{filter:brightness(1.05);}

.content__card{
  background:#fff;border-radius:20px;padding:20px 22px;
  box-shadow:0 8px 18px rgba(17,24,39,.06);
}
.section-head{margin-bottom:12px;}
.section-head--mt{margin-top:22px;}
.section-head__title{font-size:20px;font-weight:500;}
.section-head__sub{margin-top:6px;font-size:16px;font-weight:500;color:#9ca3af;}

.options{display:grid;gap:12px;margin-top:12px;}
.option{
  width:100%;
  background:#fff;
  border:1px solid rgba(156,163,175,.35);
  border-radius:14px;
  padding:18px 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  cursor:pointer;
}
.option:hover{border-color:rgba(30,64,175,.45);}
.option__left{display:flex;align-items:center;gap:14px;min-width:0;}
.option__label{font-size:20px;font-weight:500;white-space:nowrap;}
.radio{
  width:20px;height:20px;border-radius:999px;
  border:1px solid #9ca3af;display:inline-block;flex:0 0 auto;
}
.option__right-img{width:46px;height:46px;object-fit:contain;}
.cards{display:flex;align-items:center;gap:14px;}
.card-img{height:42px;width:auto;object-fit:contain;}

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
  grid-column:1/-1;margin-top:10px;padding-top:14px;border-top:1px solid rgba(255,255,255,.18);
  display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:14px;opacity:.95;
}

@media (max-width: 992px){
  .layout{grid-template-columns:1fr;}
  .nav{display:none;}
  .footer__inner{grid-template-columns:1fr;}
}
@media (max-width: 520px){
  .container{padding:0 14px;}
  .option{padding:14px;}
  .option__label{font-size:18px;}
}
</style>