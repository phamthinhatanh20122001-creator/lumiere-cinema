/* ================================================
   LUMIÈRE CINEMA — admin.js
   ================================================ */

/* ================================================
   DEMO DATA
   ================================================ */
   function loadBookings() {
    const bookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

    const tbody =
        document.getElementById("bookings-table-body");

    tbody.innerHTML = "";

    bookings.forEach(item => {
        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>${item.movie}</td>
            <td>${item.seat}</td>
            <td>${item.total.toLocaleString()} ₫</td>
            <td>
                <span class="status-chip green">
                    Đã xác nhận
                </span>
            </td>
            <td>${item.date}</td>
            <td>
                <button class="btn-admin-sm">
                    Chi tiết
                </button>
            </td>
        </tr>
        `;
    });
}
const MOVIES_DATA = [
  { id:1, title:'Thiên Đường Cuối Cùng', genre:'Tâm lý',    duration:135, age:'T13', status:'showing',  rating:9.1, sold:2341, poster:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=80&q=80' },
  { id:2, title:'Vùng Tối Tăm',          genre:'Hành động', duration:148, age:'T18', status:'showing',  rating:8.5, sold:1987, poster:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=80&q=80' },
  { id:3, title:'Bóng Tối Vĩnh Cửu',     genre:'Kinh dị',   duration:112, age:'T18', status:'showing',  rating:8.4, sold:1290, poster:'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=80&q=80' },
  { id:4, title:'Chiến Binh Thời Gian',   genre:'Hành động', duration:148, age:'T18', status:'showing',  rating:7.8, sold:1632, poster:'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=80&q=80' },
  { id:5, title:'Mùa Hè Năm Ấy',         genre:'Lãng mạn',  duration:106, age:'P',   status:'upcoming', rating:null,sold:0,    poster:'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=80&q=80' },
  { id:6, title:'Huyền Thoại Đỏ',        genre:'Phiêu lưu', duration:122, age:'T13', status:'showing',  rating:8.0, sold:938,  poster:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=80&q=80' },
  { id:7, title:'Đêm Cuối Cùng',         genre:'Kinh dị',   duration:118, age:'T16', status:'upcoming', rating:null,sold:0,    poster:'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=80&q=80' },
  { id:8, title:'Ngọn Lửa Phương Nam',    genre:'Tình cảm',  duration:98,  age:'P',   status:'showing',  rating:7.5, sold:720,  poster:'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=80&q=80' },
];

const SHOWTIMES_DATA = [
  { id:1, movie:'Bóng Tối Vĩnh Cửu',         cinema:'Hoàn Kiếm', room:'P1 – Dolby',    date:'04/06', time:'10:00', seats:68, price:85000 },
  { id:2, movie:'Bóng Tối Vĩnh Cửu',         cinema:'Hoàn Kiếm', room:'P1 – Dolby',    date:'04/06', time:'13:30', seats:12, price:85000 },
  { id:3, movie:'Bóng Tối Vĩnh Cửu',         cinema:'Hoàn Kiếm', room:'P1 – Dolby',    date:'04/06', time:'19:00', seats:84, price:85000 },
  { id:4, movie:'Thiên Đường Cuối Cùng',      cinema:'Hoàn Kiếm', room:'P2 – IMAX',     date:'04/06', time:'11:15', seats:92, price:160000 },
  { id:5, movie:'Thiên Đường Cuối Cùng',      cinema:'Hoàn Kiếm', room:'P2 – IMAX',     date:'04/06', time:'21:15', seats:60, price:160000 },
  { id:6, movie:'Chiến Binh Thời Gian',       cinema:'Tây Đô',    room:'P1 – 4DX',      date:'04/06', time:'09:30', seats:45, price:145000 },
  { id:7, movie:'Chiến Binh Thời Gian',       cinema:'Tây Đô',    room:'P1 – 4DX',      date:'04/06', time:'17:45', seats:72, price:145000 },
  { id:8, movie:'Huyền Thoại Đỏ',            cinema:'Hai Bà Trưng',room:'P2 – Dolby',  date:'04/06', time:'20:00', seats:9,  price:85000 },
  { id:9, movie:'Ngọn Lửa Phương Nam',        cinema:'Tây Đô',    room:'P3 – Standard', date:'04/06', time:'15:30', seats:47, price:85000 },
];

const BOOKINGS_DATA = [
  { id:'LM-001', user:'Nguyễn Văn An', movie:'Thiên Đường Cuối Cùng', seats:'C4, C5', total:320000, status:'confirmed', date:'04/06 09:12' },
  { id:'LM-002', user:'Trần Thị Bích',  movie:'Vùng Tối Tăm',         seats:'F2',     total:130000, status:'confirmed', date:'04/06 09:34' },
  { id:'LM-003', user:'Lê Minh Cường',  movie:'Bóng Tối Vĩnh Cửu',    seats:'B7, B8, B9', total:255000, status:'pending',   date:'04/06 10:01' },
  { id:'LM-004', user:'Phạm Thu Dung',  movie:'Chiến Binh Thời Gian',  seats:'H1, H2', total:290000, status:'confirmed', date:'04/06 10:22' },
  { id:'LM-005', user:'Hoàng Gia Hân',  movie:'Thiên Đường Cuối Cùng', seats:'D5',     total:160000, status:'cancelled', date:'04/06 10:45' },
  { id:'LM-006', user:'Vũ Thanh Hương', movie:'Huyền Thoại Đỏ',        seats:'A3, A4', total:170000, status:'confirmed', date:'04/06 11:03' },
  { id:'LM-007', user:'Đỗ Quốc Khánh',  movie:'Bóng Tối Vĩnh Cửu',    seats:'E6',     total:85000,  status:'pending',   date:'04/06 11:20' },
  { id:'LM-008', user:'Ngô Hải Linh',   movie:'Ngọn Lửa Phương Nam',   seats:'G3, G4, G5', total:255000, status:'confirmed', date:'04/06 11:35' },
  { id:'LM-009', user:'Bùi Anh Minh',   movie:'Chiến Binh Thời Gian',  seats:'C2',     total:145000, status:'confirmed', date:'04/06 11:58' },
  { id:'LM-010', user:'Đinh Khánh Nam', movie:'Thiên Đường Cuối Cùng', seats:'B1, B2', total:320000, status:'confirmed', date:'04/06 12:10' },
  { id:'LM-011', user:'Lý Mỹ Phương',   movie:'Vùng Tối Tăm',          seats:'D8',     total:85000,  status:'pending',   date:'04/06 12:28' },
  { id:'LM-012', user:'Trương Quốc Thịnh',movie:'Huyền Thoại Đỏ',      seats:'F5, F6', total:170000, status:'confirmed', date:'04/06 12:44' },
];

const USERS_DATA = [
  { id:1, name:'Nguyễn Văn An',      email:'an.nv@email.com',   role:'user',  tickets:12, spent:1020000, joined:'01/03/2025' },
  { id:2, name:'Trần Thị Bích',      email:'bich.tt@email.com', role:'user',  tickets:8,  spent:680000,  joined:'15/03/2025' },
  { id:3, name:'Admin Lumière',      email:'admin@lumiere.vn',  role:'admin', tickets:0,  spent:0,       joined:'01/01/2025' },
  { id:4, name:'Lê Minh Cường',      email:'cuong.lm@email.com',role:'user',  tickets:5,  spent:425000,  joined:'20/03/2025' },
  { id:5, name:'Phạm Thu Dung',      email:'dung.pt@email.com', role:'user',  tickets:21, spent:1785000, joined:'08/02/2025' },
  { id:6, name:'Hoàng Gia Hân',      email:'han.hg@email.com',  role:'user',  tickets:3,  spent:255000,  joined:'12/04/2025' },
  { id:7, name:'Vũ Thanh Hương',     email:'huong.vt@email.com',role:'user',  tickets:15, spent:1275000, joined:'05/02/2025' },
  { id:8, name:'Đỗ Quốc Khánh',     email:'khanh.dq@email.com',role:'user',  tickets:7,  spent:595000,  joined:'22/03/2025' },
];

const PROMOS_DATA = [
  { code:'T3VIEVE',   name:'Thứ 3 Vui Vẻ',      type:'Phần trăm', value:'40%',       used:1247, expiry:'31/12/2025', status:'active' },
  { code:'COMBO59',   name:'Combo Bắp & Nước',   type:'Combo',     value:'59.000đ',   used:893,  expiry:'31/12/2025', status:'active' },
  { code:'COUPLE30',  name:'Cặp Đôi Hạnh Phúc',  type:'Phần trăm', value:'30%',       used:412,  expiry:'31/08/2025', status:'active' },
  { code:'STUDENT20', name:'Ưu Đãi Học Sinh',     type:'Phần trăm', value:'20%',       used:2103, expiry:'31/12/2025', status:'active' },
  { code:'FLASH50',   name:'Flash Sale Thứ Tư',   type:'Phần trăm', value:'50%',       used:388,  expiry:'04/06/2025', status:'active' },
  { code:'BDAY2025',  name:'Sinh Nhật Vàng',      type:'Miễn phí',  value:'1 vé',      used:67,   expiry:'31/12/2025', status:'active' },
  { code:'TETHL2024', name:'Ưu Đãi Tết 2024',     type:'Phần trăm', value:'25%',       used:4120, expiry:'01/02/2024', status:'expired' },
];

/* ================================================
   AUTH GUARD
   ================================================ */
function getAdmin() {
  try { return JSON.parse(localStorage.getItem('lumiere_admin')); } catch { return null; }
}

function requireAdmin() {
  if (!getAdmin()) { window.location.href = 'admin-login.html'; }
}

function adminLogout() {
  localStorage.removeItem('lumiere_admin');
  window.location.href = 'admin-login.html';
}

function updateAdminUI() {
  const admin = getAdmin();
  if (!admin) return;
  const name = admin.name || 'Admin';
  ['su-avatar','topbar-avatar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = name.charAt(0).toUpperCase();
  });
  ['su-name','dash-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = name;
  });
  const settingsName  = document.getElementById('settings-name');
  const settingsEmail = document.getElementById('settings-email');
  if (settingsName)  settingsName.value  = name;
  if (settingsEmail) settingsEmail.value = admin.email || 'admin@lumiere.vn';
}

/* ================================================
   TOAST
   ================================================ */
function showAdminToast(msg, dur = 3000) {
  const t = document.getElementById('admin-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/* ================================================
   NAVIGATION
   ================================================ */
const PAGE_TITLES = {
  dashboard:  'Dashboard',
  movies:     'Quản lý phim',
  showtimes:  'Suất chiếu',
  cinemas:    'Rạp chiếu',
  bookings:   'Đơn đặt vé',
  users:      'Người dùng',
  promotions: 'Ưu đãi',
  revenue:    'Doanh thu',
  settings:   'Cài đặt',
};

function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');

  const navItem = document.querySelector(`[data-page="${name}"]`);
  if (navItem) navItem.classList.add('active');

  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = PAGE_TITLES[name] || name;

  // Lazy render
  if (name === 'movies')     renderMoviesTable();
  if (name === 'showtimes')  renderShowtimesTable();
  if (name === 'bookings')   renderBookingsTable();
  if (name === 'users')      renderUsersTable();
  if (name === 'promotions') renderPromosTable();
  if (name === 'revenue')    setTimeout(drawRevenueCharts, 80);
  if (name === 'dashboard')  { renderRecentBookings(); setTimeout(drawDashboardCharts, 80); }

  // Close mobile sidebar
  document.getElementById('sidebar')?.classList.remove('open');
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      showPage(item.dataset.page);
    });
  });
}

/* ================================================
   DASHBOARD — RECENT BOOKINGS
   ================================================ */
function renderRecentBookings() {
  const tbody = document.getElementById('recent-bookings-body');
  if (!tbody) return;
  tbody.innerHTML = BOOKINGS_DATA.slice(0, 6).map(b => `
    <tr>
      <td><span style="font-family:'Bebas Neue',sans-serif;color:var(--gold);letter-spacing:.05em">${b.id}</span></td>
      <td>${b.user}</td>
      <td>${b.movie}</td>
      <td style="color:var(--text)">${b.seats}</td>
      <td style="color:var(--gold)">${b.total.toLocaleString('vi-VN')}đ</td>
      <td>${statusChip(b.status)}</td>
      <td style="color:var(--muted)">${b.date}</td>
    </tr>
  `).join('');
}

/* ================================================
   MOVIES TABLE
   ================================================ */
function renderMoviesTable() {
  const search  = (document.getElementById('movie-search')?.value  || '').toLowerCase();
  const status  = document.getElementById('movie-status-filter')?.value || 'all';
  const genre   = document.getElementById('movie-genre-filter')?.value  || 'all';

  const genreMap = { action:'Hành động', horror:'Kinh dị', romance:'Lãng mạn', drama:'Tâm lý' };

  let data = MOVIES_DATA.filter(m => {
    const matchSearch = !search || m.title.toLowerCase().includes(search);
    const matchStatus = status === 'all' || m.status === status;
    const matchGenre  = genre  === 'all' || m.genre === (genreMap[genre] || genre);
    return matchSearch && matchStatus && matchGenre;
  });

  const tbody = document.getElementById('movies-table-body');
  if (!tbody) return;

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--muted)">Không tìm thấy phim nào</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(m => `
    <tr>
      <td><img src="${m.poster}" class="poster-thumb" alt="${m.title}" onerror="this.style.display='none'"></td>
      <td style="color:var(--cream);font-weight:500">${m.title}</td>
      <td>${m.genre}</td>
      <td>${m.duration} phút</td>
      <td style="color:var(--gold)">${m.rating ? '★ ' + m.rating : '—'}</td>
      <td>${movieStatusChip(m.status)}</td>
      <td>${m.sold.toLocaleString('vi-VN')}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" onclick="editMovie(${m.id})">Sửa</button>
          <button class="tbl-btn danger" onclick="deleteMovie(${m.id})">Xoá</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function movieStatusChip(s) {
  const map = { showing:'Đang chiếu', upcoming:'Sắp chiếu', ended:'Đã kết thúc' };
  const cls = { showing:'green', upcoming:'blue', ended:'red' };
  return `<span class="status-chip ${cls[s] || ''}">${map[s] || s}</span>`;
}

/* ================================================
   SHOWTIMES TABLE
   ================================================ */
function renderShowtimesTable() {
  const cinema = document.getElementById('st-cinema-filter')?.value || 'all';
  const date   = document.getElementById('st-date-filter')?.value   || 'all';

  let data = SHOWTIMES_DATA.filter(s =>
    (cinema === 'all' || s.cinema.includes(cinema)) &&
    (date   === 'all' || s.date === date)
  );

  const tbody = document.getElementById('showtimes-table-body');
  if (!tbody) return;

  tbody.innerHTML = data.map(s => {
    const pct  = Math.round((1 - s.seats / 100) * 100);
    const cls  = s.seats < 20 ? 'red' : s.seats < 50 ? 'yellow' : 'green';
    return `
      <tr>
        <td style="color:var(--cream)">${s.movie}</td>
        <td>${s.cinema}</td>
        <td style="color:var(--muted)">${s.room}</td>
        <td>${s.date}</td>
        <td style="color:var(--gold)">${s.time}</td>
        <td><span class="status-chip ${cls}">${s.seats} ghế</span></td>
        <td>${s.price.toLocaleString('vi-VN')}đ</td>
        <td>
          <div class="tbl-actions">
            <button class="tbl-btn" onclick="showAdminToast('Đang chỉnh sửa suất chiếu #${s.id}')">Sửa</button>
            <button class="tbl-btn danger" onclick="deleteShowtime(${s.id})">Xoá</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ================================================
   BOOKINGS TABLE
   ================================================ */
let bookingsData = [...BOOKINGS_DATA];

function renderBookingsTable() {
  const search = (document.getElementById('booking-search')?.value || '').toLowerCase();
  const status = document.getElementById('booking-status-filter')?.value || 'all';

  const data = bookingsData.filter(b => {
    const matchSearch = !search ||
      b.id.toLowerCase().includes(search) ||
      b.user.toLowerCase().includes(search) ||
      b.movie.toLowerCase().includes(search);
    const matchStatus = status === 'all' || b.status === status;
    return matchSearch && matchStatus;
  });

  const tbody = document.getElementById('bookings-table-body');
  if (!tbody) return;

  tbody.innerHTML = data.map(b => `
    <tr>
      <td><span style="font-family:'Bebas Neue',sans-serif;color:var(--gold);letter-spacing:.05em">${b.id}</span></td>
      <td style="color:var(--cream)">${b.user}</td>
      <td>${b.movie}</td>
      <td>${b.seats}</td>
      <td style="color:var(--gold)">${b.total.toLocaleString('vi-VN')}đ</td>
      <td>${statusChip(b.status)}</td>
      <td style="color:var(--muted)">${b.date}</td>
      <td>
        <div class="tbl-actions">
          ${b.status === 'pending' ? `<button class="tbl-btn success" onclick="confirmBooking('${b.id}')">Xác nhận</button>` : ''}
          ${b.status !== 'cancelled' ? `<button class="tbl-btn danger" onclick="cancelBooking('${b.id}')">Huỷ</button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function statusChip(s) {
  const map = { confirmed:'Đã xác nhận', pending:'Chờ TT', cancelled:'Đã huỷ' };
  const cls = { confirmed:'green', pending:'yellow', cancelled:'red' };
  return `<span class="status-chip ${cls[s] || ''}">${map[s] || s}</span>`;
}

function confirmBooking(id) {
  const b = bookingsData.find(x => x.id === id);
  if (b) { b.status = 'confirmed'; renderBookingsTable(); renderRecentBookings(); showAdminToast(`✓ Xác nhận đơn ${id} thành công`); }
}

function cancelBooking(id) {
  if (!confirm(`Huỷ đơn ${id}?`)) return;
  const b = bookingsData.find(x => x.id === id);
  if (b) { b.status = 'cancelled'; renderBookingsTable(); renderRecentBookings(); showAdminToast(`Đã huỷ đơn ${id}`); }
}

function exportCSV() {
  const header = ['Mã đơn','Khách hàng','Phim','Ghế','Tổng tiền','Trạng thái','Ngày đặt'];
  const rows   = bookingsData.map(b => [b.id, b.user, b.movie, b.seats, b.total, b.status, b.date]);
  const csv    = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob   = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href = url; a.download = 'lumiere_bookings.csv'; a.click();
  URL.revokeObjectURL(url);
  showAdminToast('✓ Đã xuất file CSV');
}

/* ================================================
   USERS TABLE
   ================================================ */
let usersData = [...USERS_DATA];

function renderUsersTable() {
  const search = (document.getElementById('user-search')?.value || '').toLowerCase();
  const role   = document.getElementById('user-role-filter')?.value || 'all';

  const data = usersData.filter(u =>
    (role === 'all' || u.role === role) &&
    (!search || u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search))
  );

  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  tbody.innerHTML = data.map(u => `
    <tr>
      <td>
        <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--amber));
          color:var(--bg);display:flex;align-items:center;justify-content:center;
          font-family:'Bebas Neue',sans-serif;font-size:.9rem;">
          ${u.name.charAt(0)}
        </div>
      </td>
      <td style="color:var(--cream)">${u.name}</td>
      <td style="color:var(--muted)">${u.email}</td>
      <td>${u.role === 'admin'
        ? '<span class="status-chip gold">Admin</span>'
        : '<span class="status-chip blue">User</span>'}</td>
      <td>${u.tickets}</td>
      <td style="color:var(--gold)">${u.spent.toLocaleString('vi-VN')}đ</td>
      <td style="color:var(--muted)">${u.joined}</td>
      <td>
        <div class="tbl-actions">
          ${u.role !== 'admin' ? `<button class="tbl-btn" onclick="promoteUser(${u.id})">Nâng quyền</button>` : ''}
          <button class="tbl-btn danger" onclick="deleteUser(${u.id})">Xoá</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function promoteUser(id) {
  const u = usersData.find(x => x.id === id);
  if (u && confirm(`Nâng "${u.name}" lên Admin?`)) {
    u.role = 'admin';
    renderUsersTable();
    showAdminToast(`✓ ${u.name} đã được nâng lên Admin`);
  }
}

function deleteUser(id) {
  const u = usersData.find(x => x.id === id);
  if (!u || !confirm(`Xoá người dùng "${u.name}"?`)) return;
  usersData = usersData.filter(x => x.id !== id);
  renderUsersTable();
  showAdminToast(`Đã xoá người dùng ${u.name}`);
}

/* ================================================
   PROMOS TABLE
   ================================================ */
let promosData = [...PROMOS_DATA];

function renderPromosTable() {
  const tbody = document.getElementById('promos-table-body');
  if (!tbody) return;

  tbody.innerHTML = promosData.map(p => `
    <tr>
      <td><span style="font-family:'Bebas Neue',sans-serif;color:var(--gold);letter-spacing:.1em">${p.code}</span></td>
      <td style="color:var(--cream)">${p.name}</td>
      <td>${p.type}</td>
      <td style="color:var(--green)">${p.value}</td>
      <td>${p.used.toLocaleString('vi-VN')}</td>
      <td style="color:var(--muted)">${p.expiry}</td>
      <td>${p.status === 'active'
        ? '<span class="status-chip green">Đang chạy</span>'
        : '<span class="status-chip red">Hết hạn</span>'}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" onclick="togglePromo('${p.code}')">
            ${p.status === 'active' ? 'Tắt' : 'Bật'}
          </button>
          <button class="tbl-btn danger" onclick="deletePromo('${p.code}')">Xoá</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function togglePromo(code) {
  const p = promosData.find(x => x.code === code);
  if (p) {
    p.status = p.status === 'active' ? 'inactive' : 'active';
    renderPromosTable();
    showAdminToast(`Ưu đãi ${code}: ${p.status === 'active' ? 'Đã bật' : 'Đã tắt'}`);
  }
}

function deletePromo(code) {
  if (!confirm(`Xoá ưu đãi "${code}"?`)) return;
  promosData = promosData.filter(p => p.code !== code);
  renderPromosTable();
  showAdminToast(`Đã xoá ưu đãi ${code}`);
}

/* ================================================
   MOVIE MODAL
   ================================================ */
let editingMovieId = null;

function openMovieModal(id = null) {
  editingMovieId = id;
  const title = document.getElementById('movie-modal-title');
  if (title) title.textContent = id ? 'Chỉnh sửa phim' : 'Thêm phim mới';

  if (id) {
    const m = MOVIES_DATA.find(x => x.id === id);
    if (m) {
      document.getElementById('mf-title').value  = m.title;
      document.getElementById('mf-genre').value  = m.genre;
      document.getElementById('mf-duration').value = m.duration;
      document.getElementById('mf-age').value    = m.age;
      document.getElementById('mf-status').value = m.status;
      document.getElementById('mf-poster').value = m.poster;
    }
  } else {
    document.getElementById('mf-title').value  = '';
    document.getElementById('mf-genre').value  = 'Hành động';
    document.getElementById('mf-duration').value = '';
    document.getElementById('mf-poster').value = '';
  }

  document.getElementById('movie-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMovieModal() {
  document.getElementById('movie-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function editMovie(id) { openMovieModal(id); }

function saveMovie() {
  const title = document.getElementById('mf-title').value.trim();
  if (!title) { showAdminToast('⚠ Vui lòng nhập tên phim'); return; }

  const duration = parseInt(document.getElementById('mf-duration').value) || 120;
  const movie = {
    id:       editingMovieId || (Math.max(...MOVIES_DATA.map(m => m.id)) + 1),
    title,
    genre:    document.getElementById('mf-genre').value,
    duration,
    age:      document.getElementById('mf-age').value,
    status:   document.getElementById('mf-status').value,
    rating:   null, sold: 0,
    poster:   document.getElementById('mf-poster').value || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=80&q=80',
  };

  if (editingMovieId) {
    const idx = MOVIES_DATA.findIndex(m => m.id === editingMovieId);
    if (idx !== -1) MOVIES_DATA[idx] = movie;
    showAdminToast(`✓ Đã cập nhật phim "${title}"`);
  } else {
    MOVIES_DATA.push(movie);
    showAdminToast(`✓ Đã thêm phim "${title}"`);
  }

  closeMovieModal();
  renderMoviesTable();
  populateMovieSelect();
}

function deleteMovie(id) {
  const m = MOVIES_DATA.find(x => x.id === id);
  if (!m || !confirm(`Xoá phim "${m.title}"?`)) return;
  const idx = MOVIES_DATA.findIndex(x => x.id === id);
  if (idx !== -1) MOVIES_DATA.splice(idx, 1);
  renderMoviesTable();
  showAdminToast(`Đã xoá phim "${m.title}"`);
}

/* ================================================
   SHOWTIME MODAL
   ================================================ */
function populateMovieSelect() {
  const sel = document.getElementById('stf-movie');
  if (!sel) return;
  sel.innerHTML = MOVIES_DATA.map(m => `<option value="${m.title}">${m.title}</option>`).join('');
}

function openShowtimeModal() {
  populateMovieSelect();
  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('stf-date');
  if (dateEl) dateEl.value = today;
  document.getElementById('showtime-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeShowtimeModal() {
  document.getElementById('showtime-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function saveShowtime() {
  const movie  = document.getElementById('stf-movie').value;
  const cinema = document.getElementById('stf-cinema').value.replace('Lumière ', '');
  const room   = document.getElementById('stf-room').value;
  const date   = document.getElementById('stf-date').value;
  const time   = document.getElementById('stf-time').value;
  const price  = parseInt(document.getElementById('stf-price').value) || 85000;

  if (!date || !time) { showAdminToast('⚠ Vui lòng chọn ngày và giờ chiếu'); return; }

  const [y, m, d] = date.split('-');
  const displayDate = `${d}/${m}`;

  SHOWTIMES_DATA.push({
    id: SHOWTIMES_DATA.length + 1, movie, cinema, room,
    date: displayDate, time, seats: 100, price,
  });

  closeShowtimeModal();
  renderShowtimesTable();
  showAdminToast(`✓ Đã thêm suất chiếu ${movie} — ${time} ngày ${displayDate}`);
}

function deleteShowtime(id) {
  const s = SHOWTIMES_DATA.find(x => x.id === id);
  if (!s || !confirm(`Xoá suất chiếu "${s.movie}" lúc ${s.time}?`)) return;
  const idx = SHOWTIMES_DATA.findIndex(x => x.id === id);
  if (idx !== -1) SHOWTIMES_DATA.splice(idx, 1);
  renderShowtimesTable();
  showAdminToast(`Đã xoá suất chiếu`);
}

/* ================================================
   PROMO MODAL
   ================================================ */
function openPromoModal() {
  const today = new Date(); today.setMonth(today.getMonth() + 1);
  const expEl = document.getElementById('pf-expiry');
  if (expEl) expEl.value = today.toISOString().split('T')[0];
  document.getElementById('promo-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePromoModal() {
  document.getElementById('promo-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function savePromo() {
  const code  = document.getElementById('pf-code').value.trim().toUpperCase();
  const name  = document.getElementById('pf-name').value.trim();
  const type  = document.getElementById('pf-type');
  const value = document.getElementById('pf-value').value;
  const expiry = document.getElementById('pf-expiry').value;

  if (!code || !value) { showAdminToast('⚠ Vui lòng điền mã và giá trị giảm'); return; }
  if (promosData.find(p => p.code === code)) { showAdminToast('⚠ Mã này đã tồn tại'); return; }

  const typeMap = { percent:'Phần trăm', fixed:'Cố định', free:'Miễn phí' };
  const [y, m, d] = expiry ? expiry.split('-') : ['2025','12','31'];

  promosData.push({
    code, name: name || code,
    type: typeMap[type?.value] || 'Phần trăm',
    value: type?.value === 'percent' ? value + '%' : value + 'đ',
    used: 0,
    expiry: `${d}/${m}/${y}`,
    status: 'active',
  });

  closePromoModal();
  renderPromosTable();
  showAdminToast(`✓ Đã tạo ưu đãi "${code}"`);
}

/* ================================================
   SETTINGS
   ================================================ */
function saveSettings() {
  const name  = document.getElementById('settings-name')?.value;
  const email = document.getElementById('settings-email')?.value;
  const admin = getAdmin();
  if (admin) {
    admin.name  = name  || admin.name;
    admin.email = email || admin.email;
    localStorage.setItem('lumiere_admin', JSON.stringify(admin));
    updateAdminUI();
  }
  showAdminToast('✓ Đã lưu cài đặt');
}

/* ================================================
   CHARTS (Canvas — no external library)
   ================================================ */
function drawDashboardCharts() {
  drawBarChart('revenue-chart',
    ['T7/5','CN/5','T2/3','T3/4','T4/5','T5/6','T6/7'],
    [72.1, 85.3, 61.8, 79.4, 90.2, 109.1, 95.6],
    '#c9a84c'
  );
}

function drawRevenueCharts() {
  drawMultiLineChart('cinema-revenue-chart');
  drawPieChart('pie-chart');
}

function drawBarChart(canvasId, labels, values, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth; const H = canvas.offsetHeight || 180;
  canvas.width = W; canvas.height = H;

  const pad = { top:20, right:20, bottom:36, left:48 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top  - pad.bottom;
  const max = Math.max(...values) * 1.15;
  const barW = Math.max(4, (cw / values.length) * 0.55);
  const gap  = cw / values.length;

  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,.05)';
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + ch * (1 - i/4);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle = 'rgba(106,96,80,.6)'; ctx.font = '10px DM Sans'; ctx.textAlign = 'right';
    ctx.fillText((max * i/4).toFixed(0), pad.left - 6, y + 3);
  }

  values.forEach((v, i) => {
    const x   = pad.left + gap * i + gap/2 - barW/2;
    const bh  = (v / max) * ch;
    const y   = pad.top + ch - bh;

    // Bar glow
    const grad = ctx.createLinearGradient(0, y, 0, y + bh);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(201,168,76,.3)');
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, barW, bh);

    // Top line accent
    ctx.fillStyle = '#e8c97a';
    ctx.fillRect(x, y, barW, 2);

    // Labels
    ctx.fillStyle = 'rgba(106,96,80,.8)'; ctx.font = '10px DM Sans'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], pad.left + gap*i + gap/2, H - 8);
  });
}

function drawMultiLineChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth; const H = canvas.offsetHeight || 180;
  canvas.width = W; canvas.height = H;

  const labels  = ['01','05','10','15','20','25','30'];
  const datasets = [
    { label:'Hoàn Kiếm', values:[38,42,51,39,47,55,62], color:'#c9a84c' },
    { label:'Tây Đô',    values:[28,31,35,29,33,40,45], color:'#ff6b35' },
    { label:'HBT',       values:[20,24,28,22,26,30,35], color:'#3a7bd5' },
  ];

  const pad = { top:20, right:80, bottom:36, left:48 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top  - pad.bottom;
  const allVals = datasets.flatMap(d => d.values);
  const max = Math.max(...allVals) * 1.2;

  ctx.clearRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + ch * (1 - i/4);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle='rgba(106,96,80,.6)'; ctx.font='10px DM Sans'; ctx.textAlign='right';
    ctx.fillText((max*i/4).toFixed(0), pad.left-6, y+3);
  }

  // X labels
  labels.forEach((l, i) => {
    const x = pad.left + (cw/(labels.length-1))*i;
    ctx.fillStyle='rgba(106,96,80,.7)'; ctx.font='10px DM Sans'; ctx.textAlign='center';
    ctx.fillText(l, x, H-8);
  });

  datasets.forEach((ds, di) => {
    ctx.strokeStyle = ds.color; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.beginPath();
    ds.values.forEach((v, i) => {
      const x = pad.left + (cw/(ds.values.length-1))*i;
      const y = pad.top + ch*(1 - v/max);
      i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.stroke();

    // Dots
    ds.values.forEach((v, i) => {
      const x = pad.left + (cw/(ds.values.length-1))*i;
      const y = pad.top + ch*(1-v/max);
      ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2);
      ctx.fillStyle = ds.color; ctx.fill();
    });

    // Legend
    const lx = W - pad.right + 10;
    const ly = pad.top + di * 22;
    ctx.fillStyle = ds.color; ctx.fillRect(lx, ly+2, 12, 3);
    ctx.fillStyle = 'rgba(207,196,176,.7)'; ctx.font='10px DM Sans'; ctx.textAlign='left';
    ctx.fillText(ds.label, lx+16, ly+7);
  });
}

function drawPieChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth; const H = canvas.offsetHeight || 220;
  canvas.width = W; canvas.height = H;

  const data   = [42, 32, 26];
  const colors = ['#c9a84c','#ff6b35','#3a7bd5'];
  const labels = ['Hoàn Kiếm','Tây Đô','Hai Bà Trưng'];
  const total  = data.reduce((a,b) => a+b, 0);
  const cx = W*0.38, cy = H/2, r = Math.min(cx, cy) - 20;

  ctx.clearRect(0,0,W,H);

  let startAngle = -Math.PI/2;
  data.forEach((v, i) => {
    const slice = (v/total) * Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r, startAngle, startAngle+slice);
    ctx.closePath();
    ctx.fillStyle = colors[i]; ctx.fill();
    ctx.strokeStyle = 'rgba(8,7,6,.8)'; ctx.lineWidth = 3; ctx.stroke();

    // Percentage label
    const midA = startAngle + slice/2;
    const lx = cx + Math.cos(midA)*r*0.65;
    const ly = cy + Math.sin(midA)*r*0.65;
    ctx.fillStyle='#fff'; ctx.font='bold 11px DM Sans'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(v+'%', lx, ly);

    startAngle += slice;
  });

  // Donut hole
  ctx.beginPath(); ctx.arc(cx,cy,r*0.42,0,Math.PI*2);
  ctx.fillStyle = '#161410'; ctx.fill();

  // Legend
  labels.forEach((l, i) => {
    const ly = cy - 30 + i*26;
    ctx.fillStyle=colors[i]; ctx.fillRect(W*0.72, ly, 12, 12);
    ctx.fillStyle='rgba(207,196,176,.8)'; ctx.font='11px DM Sans';
    ctx.textAlign='left'; ctx.textBaseline='top';
    ctx.fillText(l, W*0.72+18, ly);
  });
}

/* ================================================
   SIDEBAR TOGGLE (mobile)
   ================================================ */
function initSidebarToggle() {
  const btn     = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ================================================
   CHART TABS (dashboard)
   ================================================ */
function initChartTabs() {
  document.querySelectorAll('.chart-tabs .ct').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-tabs .ct').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setTimeout(() => drawDashboardCharts(), 40);
    });
  });
}

/* ================================================
   MODAL OVERLAY CLOSE
   ================================================ */
function initModalClose() {
  ['movie-modal','showtime-modal','promo-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', e => {
      if (e.target === el) {
        el.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ================================================
   RESIZE — redraw charts
   ================================================ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const active = document.querySelector('.page.active');
    if (!active) return;
    if (active.id === 'page-dashboard') drawDashboardCharts();
    if (active.id === 'page-revenue')   drawRevenueCharts();
  }, 200);
});

/* ================================================
   INIT
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  requireAdmin();
  updateAdminUI();
  initNavigation();
  initSidebarToggle();
  initChartTabs();
  initModalClose();

  // Logout
  document.getElementById('admin-logout-btn')?.addEventListener('click', adminLogout);

  // Init first page
  renderRecentBookings();
  setTimeout(drawDashboardCharts, 100);
});
document.addEventListener("DOMContentLoaded", () => {
    loadBookings();
});