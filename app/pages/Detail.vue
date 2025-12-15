<template>
  <div class="page">
    <!-- HEADER -->
    <header class="header">
      <div class="header__inner container">
        <div class="brand">
          <img :src="logoHeader" alt="TinkerKit" class="brand__logo" />
          <span class="brand__name">TinkerKit</span>
        </div>

        <nav class="nav">
          <a href="#" class="nav__link">Inventory</a>
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
        <div class="layout">
          <aside class="left">
            <div class="left__imageCard">
              <img :src="productImage" alt="Leonardo R3" class="left__img" />
            </div>

            <div class="left__statusCard">
              <div class="left__status">Status Available</div>

              <div class="left__ctaWrap">
                <button class="btn-primary" type="button">Borrow Now</button>
              </div>

              <div v-if="selectedLabel" class="left__selected">
                Selected: <strong>{{ selectedLabel }}</strong>
              </div>
            </div>

          </aside>

          <!-- RIGHT -->
          <section class="right">
            <article class="card">
              <h1 class="title">Leonardo R3</h1>
              <p class="subtitle">Microcontroller &amp; Boards</p>
              <p class="desc">
                The Leonardo differs from all preceding boards in that the ATmega32u4 has built-in USB
                communication, eliminating the need for a secondary processor. This allows the Leonardo to
                appear to a connected computer as a mouse and keyboard, in addition to a virtual (CDC) serial / COM port.
              </p>
            </article>

            <article class="card card--calendar">
              <div class="calendar__header">
                <button class="icon-btn" type="button" aria-label="Previous month" @click="prevMonth">
                  <img :src="iconPrev" alt="" />
                </button>

                <div class="calendar__month">{{ monthLabel }}</div>

                <button class="icon-btn" type="button" aria-label="Next month" @click="nextMonth">
                  <img :src="iconNext" alt="" />
                </button>
              </div>

              <div class="calendar__dow">
                <span v-for="d in daysOfWeek" :key="d">{{ d }}</span>
              </div>

              <div class="calendar__grid calendar__grid--days">
                <button
                  v-for="(cell, i) in calendarCells"
                  :key="i"
                  type="button"
                  class="day"
                  :class="{
                    'day--muted': !cell.inMonth,
                    'day--today': cell.isToday,
                    'day--selected': cell.isSelected
                  }"
                  :disabled="!cell.inMonth"
                  @click="selectDate(cell)"
                >
                  {{ cell.day }}
                </button>
              </div>

              <div class="calendar__hint">
                <span class="dot dot--today"></span> Today
                <span class="dot dot--selected"></span> Selected
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <div class="brand">
            <img :src="logoFooter" alt="TinkerKit" class="brand__logo" />
            <span class="brand__name">TinkerKit</span>
          </div>

          <p class="footer__tagline">One Place for All Your IoT Device Needs.</p>

          <div class="social">
            <a href="#" aria-label="Instagram" class="social__btn">
              <img :src="iconIg" alt="" />
            </a>
            <a href="#" aria-label="Twitter" class="social__btn">
              <img :src="iconTw" alt="" />
            </a>
            <a href="#" aria-label="Email" class="social__btn">
              <img :src="iconEmail" alt="" />
            </a>
            <a href="#" aria-label="Discord" class="social__btn">
              <img :src="iconDiscord" alt="" />
            </a>
            <a href="#" aria-label="WhatsApp" class="social__btn">
              <img :src="iconWa" alt="" />
            </a>
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
import { computed, ref } from 'vue'

const logoHeader   = '/app_icon.svg'
const logoFooter   = '/app_icon.svg'

const productImage = '/Detail/image111340-ssq-400h.png'
const previewImage = '/Detail/rectangle4481341-pqee-500w.png'

const iconPrev = '/Detail/oouinextrtl1407-sfid.svg'
const iconNext = '/Detail/oouinextltr1405-awg.svg'

const iconIg      = '/Detail/vector1323-1kd8.svg'
const iconTw      = '/Detail/vector1327-rbgx.svg'
const iconEmail   = '/Detail/icbaselineemail1328-6104.svg'
const iconDiscord = '/Detail/icbaselinediscord1330-rfu.svg'
const iconWa      = '/Detail/riwhatsappfill1332-9z0o.svg'


const daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const current = ref(new Date())     
const selected = ref(null)         

function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1) }
function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0) }

function isSameDate(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

function mondayIndex(jsDay) { return (jsDay + 6) % 7 }

const monthLabel = computed(() => {
  return current.value.toLocaleString('en-US', { month: 'long', year: 'numeric' })
})

const selectedLabel = computed(() => {
  if (!selected.value) return ''
  return selected.value.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
})

const calendarCells = computed(() => {
  const base = current.value
  const today = new Date()

  const start = startOfMonth(base)
  const end = endOfMonth(base)

  const startGrid = new Date(start)
  startGrid.setDate(start.getDate() - mondayIndex(start.getDay()))

  const cells = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(startGrid)
    d.setDate(startGrid.getDate() + i)

    const inMonth = d.getMonth() === base.getMonth()
    cells.push({
      date: d,
      day: d.getDate(),
      inMonth,
      isToday: isSameDate(d, today),
      isSelected: selected.value ? isSameDate(d, selected.value) : false,
    })
  }

  return cells
})

function prevMonth() {
  const d = new Date(current.value)
  d.setMonth(d.getMonth() - 1)
  current.value = d
}

function nextMonth() {
  const d = new Date(current.value)
  d.setMonth(d.getMonth() + 1)
  current.value = d
}

function selectDate(cell) {
  if (!cell.inMonth) return
  selected.value = new Date(cell.date)
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
.brand{ display: flex; align-items: center; gap: 12px; flex: 0 0 auto; }
.brand__logo{ border-radius:20px; object-fit:cover; }
.brand__name{ color: #fff; font-weight: 700; font-size: 24px; line-height: 1; white-space: nowrap; }

.nav{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 32px;
  white-space: nowrap;
}
.nav__link{ color: #fff; font-weight: 600; font-size: 14px; opacity: 0.95; }
.nav__link:hover{ opacity: 1; text-decoration: underline; }

.header__avatar{
  border-radius:10px;
  background: transparent;  
  padding:0;
  border:none;
}

.main { padding: 28px 0 36px; }
.layout { display: grid; grid-template-columns: 420px 1fr; gap: 24px; align-items: start; }
.left { display: grid; gap: 16px; }
.right { display: grid; gap: 18px; }

.card { background: #fff; border-radius: 14px; padding: 18px; box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06); }
.title { font-size: clamp(24px, 3vw, 40px); font-weight: 600; margin-bottom: 6px; }
.subtitle { color: #9ca3af; font-size: 14px; margin-bottom: 14px; }
.desc { font-size: 14px; line-height: 1.7; }

.left__imageCard { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06); }
.left__img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; }

.left__statusCard { background: #fff; border-radius: 14px; padding: 16px; box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06); }
.left__status { font-size: 16px; margin-bottom: 12px; font-weight: 500; }
.left__ctaWrap { display: flex; }
.left__selected { margin-top: 12px; font-size: 13px; color: #374151; }

.btn-primary { width: 100%; height: 52px; border-radius: 12px; background: #1e40af; color: #fff; font-weight: 700; font-size: 16px; cursor: pointer; }
.btn-primary:hover { filter: brightness(1.05); }

.left__preview { border-radius: 14px; overflow: hidden; background: #fff; box-shadow: 0 8px 18px rgba(17, 24, 39, 0.06); }
.left__previewImg { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; }

.card--calendar { padding: 16px; }
.calendar__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.calendar__month { font-size: 20px; font-weight: 500; }

.icon-btn {
  width: 40px; height: 40px; border-radius: 10px;
  background: #f3f4f6; display: grid; place-items: center; cursor: pointer;
}
.icon-btn:hover { filter: brightness(0.98); }
.icon-btn img { width: 20px; height: 20px; }

.calendar__dow {
  display: grid; grid-template-columns: repeat(7, 1fr);
  gap: 8px; font-size: 13px; margin-bottom: 10px; opacity: 0.9;
}
.calendar__dow span { text-align: center; }

.calendar__grid--days {
  display: grid; grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day{
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  background: #f9fafb;
  border: 1px solid #eef2f7;
  display: grid;
  place-items: center;
  font-weight: 600;
  cursor: pointer;
}
.day:hover{ filter: brightness(0.98); }
.day:disabled{ cursor: not-allowed; opacity: 0.45; }

.day--muted{
  background: #ffffff;
  border: 1px dashed #e5e7eb;
  opacity: 0.55;
}

.day--today{
  outline: 2px solid rgba(30, 64, 175, 0.35);
  background: rgba(30, 64, 175, 0.08);
  border-color: rgba(30, 64, 175, 0.18);
}

.day--selected{
  background: rgba(30, 64, 175, 0.18);
  border-color: rgba(30, 64, 175, 0.35);
}

.calendar__hint{
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-size: 12px;
  color: #6b7280;
}
.dot{
  width: 10px; height: 10px; border-radius: 999px; display: inline-block;
}
.dot--today{ background: rgba(30, 64, 175, 0.35); }
.dot--selected{ background: rgba(30, 64, 175, 0.6); }

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
  .layout { grid-template-columns: 1fr; }
  .nav { display: none; }
  .footer__inner { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .header__inner { height: 64px; }
  .brand__name { font-size: 20px; }
  .container { padding: 0 14px; }
  .calendar__grid--days { gap: 8px; }
}
</style>