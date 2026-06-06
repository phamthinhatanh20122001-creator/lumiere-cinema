/* ================================================
   LUMIÈRE CINEMA — main.js
   ================================================ */

const PRICE_NORMAL = 85000;
const PRICE_VIP    = 130000;

let selectedSeats = [];
let takenSeats    = new Set();
const ROWS     = ['A','B','C','D','E','F','G','H'];
const VIP_ROWS = ['F','G','H'];

/* ================================================
   AUTH
   ================================================ */
function getUser() {
  try { return JSON.parse(localStorage.getItem('lumiere_user')); } catch { return null; }
}

function updateNavAuth() {
  const user      = getUser();
  const navBtn    = document.getElementById('nav-login-btn');
  const navUser   = document.getElementById('nav-user');
  const navAvatar = document.getElementById('nav-avatar');
  const navName   = document.getElementById('nav-name');
  if (!navBtn || !navUser) return;
  if (user) {
    navBtn.style.display = 'none';
    navUser.classList.add('show');
    if (navAvatar) navAvatar.textContent = user.name.charAt(0).toUpperCase();
    if (navName)   navName.textContent   = user.name;
  } else {
    navBtn.style.display = 'inline-block';
    navUser.classList.remove('show');
  }
  // also in mobile menu
  const mobileLogin = document.querySelector('.mobile-login');
  if (mobileLogin) {
    if (user) { mobileLogin.textContent = 'Đăng xuất'; mobileLogin.onclick = logout; }
    else      { mobileLogin.textContent = 'Đăng nhập'; mobileLogin.href = 'login.html'; }
  }
}

function logout() {
  localStorage.removeItem('lumiere_user');
  updateNavAuth();
  showToast('Đã đăng xuất.');
}

/* ================================================
   TOAST
   ================================================ */
function showToast(msg, duration = 2800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* ================================================
   MOVIE FILTER TABS
   ================================================ */
function initMovieFilter() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.movie-card').forEach(card => {
        const status = card.dataset.status;
        if (filter === 'all' || status === filter) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.4s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ================================================
   SHOWTIME: DATE TABS + CINEMA FILTER
   ================================================ */
function initShowtimeTabs() {
  document.querySelectorAll('.date-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.date-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  document.querySelectorAll('.cinema-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cinema-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cinema = btn.dataset.cinema;
      document.querySelectorAll('.showtime-row').forEach(row => {
        if (cinema === 'all' || row.dataset.cinema === cinema) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

function scrollToShowtime(cinemaCode) {
  const section = document.getElementById('section-showtime');
  if (section) { section.scrollIntoView({ behavior: 'smooth' }); }
  setTimeout(() => {
    document.querySelectorAll('.cinema-filter').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cinema === cinemaCode);
    });
    document.querySelectorAll('.showtime-row').forEach(row => {
      row.style.display = (row.dataset.cinema === cinemaCode) ? '' : 'none';
    });
  }, 500);
}

/* ================================================
   SEAT MODAL
   ================================================ */
function generateTaken() {
  const taken = new Set();
  while (taken.size < 22) taken.add(Math.floor(Math.random() * 70));
  return taken;
}

function buildSeats() {
  takenSeats    = generateTaken();
  selectedSeats = [];
  const container = document.getElementById('seats-container');
  if (!container) return;
  container.innerHTML = '';

  ROWS.forEach((row, rIdx) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';
    const label = document.createElement('div');
    label.className = 'row-label';
    label.textContent = row;
    rowDiv.appendChild(label);

    for (let i = 0; i < 9; i++) {
      if (i === 4) {
        const gap = document.createElement('div');
        gap.className = 'seat-gap';
        rowDiv.appendChild(gap);
      }
      const seatIdx = rIdx * 9 + i;
      const isVip   = VIP_ROWS.includes(row);
      const isTaken = takenSeats.has(seatIdx);
      const seat = document.createElement('div');
      seat.className = 'seat' + (isVip ? ' vip' : '') + (isTaken ? ' taken' : '');
      seat.dataset.id    = row + (i + 1);
      seat.dataset.vip   = isVip;
      seat.dataset.taken = isTaken;
      if (!isTaken) seat.addEventListener('click', () => toggleSeat(seat));
      rowDiv.appendChild(seat);
    }
    container.appendChild(rowDiv);
  });
  updateSummary();
}

function toggleSeat(el) {
  if (el.dataset.taken === 'true') return;
  const id = el.dataset.id, isVip = el.dataset.vip === 'true';
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s.id !== id);
  } else {
    el.classList.add('selected');
    selectedSeats.push({ id, vip: isVip });
  }
  updateSummary();
}

function updateSummary() {
  const total = selectedSeats.reduce((s, x) => s + (x.vip ? PRICE_VIP : PRICE_NORMAL), 0);
  const label = document.getElementById('selected-label');
  const info  = document.getElementById('selected-info');
  const price = document.getElementById('total-price');
  if (!label || !info || !price) return;
  if (selectedSeats.length === 0) {
    label.textContent = 'Chưa chọn ghế';
    info.textContent  = 'Nhấn vào ghế để chọn';
  } else {
    label.textContent = `Ghế: ${selectedSeats.map(s => s.id).join(', ')}`;
    info.textContent  = `${selectedSeats.length} ghế — ${selectedSeats.some(s=>s.vip) ? 'VIP / Thường' : '85.000đ/ghế'}`;
  }
  price.textContent = total.toLocaleString('vi-VN') + ' ₫';
}

function openSeatModal(title, time, date) {
  if (!getUser()) {
    if (confirm('Bạn cần đăng nhập để đặt vé.\nBấm OK để đến trang đăng nhập.')) {
      window.location.href = 'login.html';
    }
    return;
  }
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-info').textContent  = `${date} · ${time} · Phòng 2`;
  document.getElementById('seat-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  buildSeats();
}

function closeSeatModal() {
  document.getElementById('seat-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function confirmBooking() {
  if (selectedSeats.length === 0) { showToast('⚠ Vui lòng chọn ít nhất một ghế!'); return; }
  const total = selectedSeats.reduce((s, x) => s + (x.vip ? PRICE_VIP : PRICE_NORMAL), 0);
  const movie = document.getElementById('modal-title')?.textContent || '';
  const info  = document.getElementById('modal-info')?.textContent  || '';
  closeSeatModal();
  showToast(`✓ Đặt vé thành công! ${movie} — Ghế ${selectedSeats.map(s=>s.id).join(', ')} — ${total.toLocaleString('vi-VN')}đ`, 4000);
}

/* ================================================
   TRAILER MODAL
   ================================================ */
function openTrailer(youtubeId, title) {
  const modal   = document.getElementById('trailer-modal');
  const iframe  = document.getElementById('trailer-iframe');
  const titleEl = document.getElementById('trailer-title');
  if (!modal || !iframe) return;
  titleEl.textContent = title + ' — Trailer';
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrailer() {
  const modal  = document.getElementById('trailer-modal');
  const iframe = document.getElementById('trailer-iframe');
  if (modal)  modal.classList.remove('open');
  if (iframe) iframe.src = '';
  document.body.style.overflow = '';
}

/* ================================================
   PROMO UTILS
   ================================================ */
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`✓ Đã sao chép mã: ${code}`);
  }).catch(() => {
    showToast(`Mã khuyến mãi: ${code}`);
  });
}

function notify(movieTitle) {
  showToast(`🔔 Sẽ nhắc bạn khi "${movieTitle}" mở đặt vé!`);
}

/* ================================================
   COUNTDOWN (flash sale)
   ================================================ */
function startCountdown() {
  const hEl = document.getElementById('cd-h');
  const mEl = document.getElementById('cd-m');
  const sEl = document.getElementById('cd-s');
  if (!hEl) return;

  let total = 5 * 3600 + 23 * 60 + 41;
  const tick = () => {
    if (total <= 0) { clearInterval(iv); return; }
    total--;
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    hEl.textContent = h;
    mEl.textContent = m;
    sEl.textContent = s;
  };
  const iv = setInterval(tick, 1000);
}

/* ================================================
   MOBILE MENU
   ================================================ */
function closeMobile() {
  document.getElementById('mobile-menu')?.classList.remove('open');
}

function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('active');
  });
}

/* ================================================
   NAVBAR SCROLL EFFECT
   ================================================ */
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ================================================
   SMOOTH SCROLL for nav links
   ================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ================================================
   AUTH FORMS (login.html)
   ================================================ */
function initAuthForms() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t  => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      input.type  = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email    = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const msg      = document.getElementById('login-msg');
      if (!email || !password) { showFormMsg(msg, 'error', 'Vui lòng điền đầy đủ thông tin.'); return; }
      const stored = JSON.parse(localStorage.getItem('lumiere_users') || '[]');
      const user   = stored.find(u => u.email === email && u.password === password);
      if (!user) { showFormMsg(msg, 'error', 'Email hoặc mật khẩu không đúng.'); return; }
      localStorage.setItem('lumiere_user', JSON.stringify({ name: user.name, email: user.email }));
      showFormMsg(msg, 'success', 'Đăng nhập thành công! Đang chuyển hướng…');
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }

  const registerForm = document.getElementById('form-register');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name  = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const pw    = document.getElementById('reg-password').value;
      const pw2   = document.getElementById('reg-password2').value;
      const agree = document.getElementById('reg-agree');
      const msg   = document.getElementById('register-msg');
      if (!name || !email || !pw || !pw2)       { showFormMsg(msg, 'error', 'Vui lòng điền đầy đủ thông tin.'); return; }
      if (pw !== pw2)                            { showFormMsg(msg, 'error', 'Mật khẩu xác nhận không khớp.'); return; }
      if (pw.length < 6)                         { showFormMsg(msg, 'error', 'Mật khẩu phải có ít nhất 6 ký tự.'); return; }
      if (agree && !agree.checked)               { showFormMsg(msg, 'error', 'Vui lòng đồng ý với điều khoản.'); return; }
      const stored = JSON.parse(localStorage.getItem('lumiere_users') || '[]');
      if (stored.find(u => u.email === email))   { showFormMsg(msg, 'error', 'Email này đã được đăng ký.'); return; }
      stored.push({ name, email, password: pw });
      localStorage.setItem('lumiere_users', JSON.stringify(stored));
      localStorage.setItem('lumiere_user', JSON.stringify({ name, email }));
      showFormMsg(msg, 'success', 'Tạo tài khoản thành công! Đang chuyển hướng…');
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }
}

function showFormMsg(el, type, text) {
  if (!el) return;
  el.className = `form-msg ${type} show`;
  el.textContent = text;
}

/* ================================================
   CLOSE MODALS ON OVERLAY CLICK
   ================================================ */
function initModalClose() {
  ['seat-modal', 'trailer-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', e => {
      if (e.target === el) {
        if (id === 'seat-modal')    closeSeatModal();
        if (id === 'trailer-modal') closeTrailer();
      }
    });
  });
}

/* ================================================
   INIT
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  updateNavAuth();
  initMovieFilter();
  initShowtimeTabs();
  initMobileMenu();
  initNavbarScroll();
  initSmoothScroll();
  initModalClose();
  startCountdown();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  if (document.body.classList.contains('auth-page')) {
    initAuthForms();
  }
});
const movies = JSON.parse(localStorage.getItem("movies")) || [];

const movieGrid = document.querySelector(".movies-grid");

if(movieGrid){

    movieGrid.innerHTML = "";

    movies.forEach(movie => {

        movieGrid.innerHTML += `
        <div class="movie-card">

            <div class="movie-poster">
                <img src="https://via.placeholder.com/300x450">
            </div>

            <h3 class="movie-title">
                ${movie.name}
            </h3>

            <div class="movie-info">
                ${movie.genre} • ${movie.duration} phút
            </div>

        </div>
        `;

    });

}