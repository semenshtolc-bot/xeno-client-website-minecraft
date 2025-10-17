// Бургер-меню (простое открытие/закрытие)
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Кнопки карусели
const track = document.querySelector('.car-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
if (track && prev && next) {
  next.addEventListener('click', ()=> track.scrollBy({left: track.clientWidth, behavior:'smooth'}));
  prev.addEventListener('click', ()=> track.scrollBy({left: -track.clientWidth, behavior:'smooth'}));
}

// Счётчики
const nums = document.querySelectorAll('.num');
const animateCounters = () => {
  nums.forEach(el=>{
    const target = parseFloat(el.dataset.count);
    let start = 0;
    const step = () => {
      start += (target - start) * 0.08;
      if (Math.abs(target - start) < 0.3) { el.textContent = target; return; }
      el.textContent = (Math.round(start*10)/10).toString();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};
const onVisible = (el, cb) => {
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ cb(); io.disconnect(); }});
  }, {threshold:0.3});
  io.observe(el);
};
const stats = document.querySelector('.stats');
if (stats) onVisible(stats, animateCounters);

// Динамический год
document.getElementById('year').textContent = new Date().getFullYear();

// Генерация ссылки скачивания (заглушка)
const dlLink = document.getElementById('dl-link');
const mcSel = document.getElementById('mc-version');
const loaderSel = document.getElementById('loader');
if (dlLink && mcSel && loaderSel) {
  const buildUrl = () => `https://example.com/xeno/${loaderSel.value.toLowerCase()}/${mcSel.value}/latest`;
  const update = () => dlLink.href = buildUrl();
  mcSel.addEventListener('change', update);
  loaderSel.addEventListener('change', update);
  update();
}