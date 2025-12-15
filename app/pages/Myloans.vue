<template>
  <div class="page">
    <header class="header">
      <div class="header__inner container">
        <div class="brand">
          <img :src="logoHeader" alt="TinkerKit" class="brand__logo" />
          <span class="brand__name">TinkerKit</span>
        </div>

        <nav class="nav">
          <a href="/inventory" class="nav__link">Inventory</a>
          <a href="#" class="nav__link">About us</a>
          <a href="#" class="nav__link">Membership</a>
          <a href="#" class="nav__link">FAQ</a>
        </nav>

        <button class="header__avatar" type="button" aria-label="User menu">
            <img :src="logoHeader" alt="User Avatar" />
        </button>

      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="myloans-layout">
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
                to="/Payments"
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
            <div class="loans">
              <article v-for="loan in loans" :key="loan.id" class="loan-card">
                <img :src="loan.image" :alt="loan.name" class="loan-card__img" />

                <div class="loan-card__content">
                  <h3 class="loan-card__title">{{ loan.name }}</h3>

                  <div class="loan-card__meta">
                    <div class="meta-item">
                      <div class="meta-label">Type</div>
                      <div class="meta-value">{{ loan.type }}</div>
                    </div>

                    <div class="meta-item">
                      <div class="meta-label">Requested</div>
                      <div class="meta-value">{{ loan.requested }}</div>
                    </div>

                    <div class="meta-item">
                      <div class="meta-label">Borrow Date</div>
                      <div class="meta-value">{{ loan.borrow }}</div>
                    </div>

                    <div class="meta-item">
                      <div class="meta-label">Due Date</div>
                      <div class="meta-value">{{ loan.due }}</div>
                    </div>
                  </div>
                </div>

                <span class="status-pill" :class="statusClass(loan.status)">
                  {{ loan.status }}
                </span>
              </article>
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

import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(path) {
  return route.path === path
}


const logoHeader = '/app_icon.svg'
const logoFooter = '/app_icon.svg'

const iconIg      = '/Myloans/vectori112-gyg.svg'
const iconTw      = '/Myloans/vectori112-mlg7.svg'
const iconEmail   = '/Myloans/icbaselineemaili112-teli.svg'
const iconDiscord = '/Myloans/icbaselinediscordi112-t8e9.svg'
const iconWa      = '/Myloans/riwhatsappfilli112-cza4.svg'

const loans = [
  { id: 1, name: 'Leonardo R3', type: 'Microcontroller & Boards', requested: '23 August 2025', borrow: '24 August 2025', due: '31 August 2025', status: 'Requested', image: '/Myloans/image111163-gu1u-200h.png' },
  { id: 2, name: 'Leonardo R3', type: 'Microcontroller & Boards', requested: '23 August 2025', borrow: '24 August 2025', due: '31 August 2025', status: 'Approved',  image: '/Myloans/image111188-dicj-200h.png' },
  { id: 3, name: 'Leonardo R3', type: 'Microcontroller & Boards', requested: '23 August 2025', borrow: '24 August 2025', due: '31 August 2025', status: 'On Loan',   image: '/Myloans/image111213-zcd-200h.png' },
  { id: 4, name: 'Leonardo R3', type: 'Microcontroller & Boards', requested: '23 August 2025', borrow: '24 August 2025', due: '31 August 2025', status: 'Returned',  image: '/Myloans/image111238-zyqb-200h.png' },
  { id: 5, name: 'Leonardo R3', type: 'Microcontroller & Boards', requested: '23 August 2025', borrow: '24 August 2025', due: '31 August 2025', status: 'Rejected',  image: '/Myloans/image111263-feg1-200h.png' },
]

function statusClass(status) {
  const s = (status || '').toLowerCase()
  if (s.includes('request')) return 'is-requested'
  if (s.includes('approv')) return 'is-approved'
  if (s.includes('on loan')) return 'is-onloan'
  if (s.includes('return')) return 'is-returned'
  if (s.includes('reject')) return 'is-rejected'
  return ''
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f9fafb;
  color: #111827;
  font-family: Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
.container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
img { max-width: 100%; height: auto; display: block; }

.header { background: #1e40af; position: sticky; top: 0; z-index: 10; }
.header__inner{
  position: relative;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.brand{ display:flex; align-items:center; gap:12px; flex:0 0 auto; }
.brand__logo{ border-radius:20px; object-fit:cover; }
.brand__name{ color:#fff; font-weight:700; font-size:24px; line-height:1; white-space:nowrap; }

.nav{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  align-items:center;
  gap:32px;
  white-space:nowrap;
}
.nav__link{ color:#fff; font-weight:600; font-size:14px; opacity:.95; }
.nav__link:hover{ opacity:1; text-decoration:underline; }

.header__avatar{
  border-radius:10px;
  background: transparent;  
  padding:0;
  border:none;
}


.main { padding: 28px 0 36px; }

.myloans-layout{
  display:grid;
  grid-template-columns: 323px 1fr;
  gap: 24px;
  align-items:start;
}

.side__card{
  background:#fff;
  border-radius:20px;
  padding:20px;
  box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);
}
.side__section{ margin-bottom: 22px; }
.side__title{ font-size:20px; font-weight:500; margin-bottom:10px; }
.side__item{ font-size:16px; }
.side__item.is-muted{ color:#9ca3af; }
.side__item.is-active{
  color:#111827;
  border-left-color: #1e40af;
  font-weight: 400;
}

.logout{
  width:100%;
  height:50px;
  border-radius:10px;
  background:#1e40af;
  color:#fff;
  font-size:16px;
  font-weight:500;
  cursor:pointer;
}
.logout:hover{ filter: brightness(1.05); }

.loans{ display:grid; gap:18px; }

.loan-card{
  background:#fff;
  border-radius:20px;
  padding:18px 22px;
  box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06);

  display:grid;
  grid-template-columns: 72px 1fr auto; 
  gap: 18px;
  align-items:center;                 
}

.loan-card__img{
  width:72px;
  height:72px;
  object-fit:contain;
}

.loan-card__content{
  display:flex;
  flex-direction:column;
  gap:14px;
  min-width: 0;
}

.loan-card__title{
  font-size:22px;
  font-weight:600;
  margin:0;
}

.loan-card__meta{
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}
.meta-label{
  font-size:16px;
  font-weight:700;
}
.meta-value{
  margin-top:8px;
  font-size:16px;
  color:#9ca3af;
  font-weight:600;
}

.status-pill{
  justify-self: end;
  align-self: center; 
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.status-pill.is-requested{ background: rgba(239, 198, 77, 0.28); color:#EFC64D; }
.status-pill.is-approved { background: rgba(56, 149, 227, 0.28); color:#3895E3; }
.status-pill.is-onloan  { background: rgba(63, 190, 98, 0.28);  color:#3FBE62; }
.status-pill.is-returned{ background: rgba(156, 163, 175, 0.28); color:#9CA3AF; }
.status-pill.is-rejected{ background: rgba(235, 96, 98, 0.28);  color:#EB6062; }

.footer { margin-top: 28px; background: #1e40af; color: #fff; padding: 40px 0; }
.footer__inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 26px; }
.footer__tagline { margin-top: 10px; opacity: 0.95; font-size: 14px; line-height: 1.5; }
.social { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
.social__btn { width: 38px; height: 38px; border-radius: 12px; background: rgba(255,255,255,0.12); display: grid; place-items: center; }
.social__btn img { width: 22px; height: 22px; }
.social__btn:hover { background: rgba(255,255,255,0.18); }

.footer__links { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-content: start; }
.footer__col { display: grid; gap: 8px; font-size: 14px; }
.footer__col a { opacity: 0.95; }
.footer__col a:hover { opacity: 1; text-decoration: underline; }

.footer__bottom {
  grid-column: 1 / -1;
  margin-top: 10px;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.18);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  opacity: 0.95;
}

@media (max-width: 992px) {
  .myloans-layout{ grid-template-columns: 1fr; }
  .nav{ display:none; }
  .footer__inner{ grid-template-columns: 1fr; }
  .loan-card__meta{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 520px) {
  .container{ padding: 0 14px; }

  .loan-card{
    grid-template-columns: 56px 1fr;
    grid-template-areas:
      "img  content"
      "img  status";
    gap: 12px;
    padding: 16px;
  }
  .loan-card__img{ width:56px; height:56px; grid-area: img; }
  .loan-card__content{ grid-area: content; }
  .status-pill{
    grid-area: status;
    justify-self: start;
    align-self: start;
    margin-top: 4px;
  }

  .loan-card__title{ font-size:18px; }
  .loan-card__meta{ grid-template-columns: 1fr; gap: 14px; }
}
</style>