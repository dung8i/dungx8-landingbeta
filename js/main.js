/* ======================================================================
   main.js — toàn bộ logic của website.
   Nội dung hiển thị lấy từ window.SITE_DATA (js/data.js).
   ====================================================================== */

/* ---------- 0. TỪ ĐIỂN GIAO DIỆN (nhãn cố định, không phải nội dung) ---------- */
const UI_STRINGS = {
  nav_about: { vi: "About", en: "About" },
  nav_project: { vi: "Project", en: "Project" },
  nav_journey: { vi: "Journey", en: "Journey" },
  nav_blog: { vi: "Blog", en: "Blog" },
  nav_contact: { vi: "Contact", en: "Contact" },
  scroll_down: { vi: "Cuộn xuống", en: "Scroll down" },
  about_eyebrow: { vi: "Giới thiệu", en: "Introduction" },
  about_title: { vi: "About Me", en: "About Me" },
  project_eyebrow: { vi: "Xưởng của mình", en: "My workshop" },
  project_title: { vi: "Dự Án Của Mình", en: "My Projects" },
  journey_eyebrow: { vi: "Chặng đường", en: "The path so far" },
  journey_title: { vi: "Hành Trình", en: "Journey" },
  blog_eyebrow: { vi: "Nhật ký", en: "Notes" },
  blog_title: { vi: "Blog", en: "Blog" },
  blog_view_all: { vi: "Xem tất cả bài viết", en: "View all posts" },
  contact_eyebrow: { vi: "Kết nối", en: "Get in touch" },
  contact_title: { vi: "Contact", en: "Contact" },
  form_name: { vi: "Họ và tên", en: "Full name" },
  form_email: { vi: "Email", en: "Email" },
  form_company: { vi: "Công ty / Tổ chức", en: "Company / Organization" },
  form_topics: { vi: "Chủ đề quan tâm", en: "Topics of interest" },
  form_message: { vi: "Tin nhắn chi tiết", en: "Message" },
  form_submit: { vi: "Gửi tin nhắn", en: "Send message" },
  form_note: { vi: "Tin nhắn sẽ được gửi trực tiếp đến email quản trị.", en: "Your message will be sent directly to the admin email." },
  coming_soon: { vi: "Sắp ra mắt", en: "Coming soon" },
  visit_link: { vi: "Xem dự án", en: "View project" },
  location_label: { vi: "ĐỊA ĐIỂM", en: "LOCATION" },
  experience_title: { vi: "Kinh nghiệm", en: "Experience" },
  email_hint: { vi: "Bấm vào icon để hiện", en: "Click icon to reveal" },
  read_on_blog: { vi: "Xem trên blog", en: "Read on blog" }
};

let currentLang = "vi";
const D = window.SITE_DATA;

/* ---------- 1. RENDER TỪ DATA.JS ---------- */
function t(field){ return field ? field[currentLang] : ""; }

function renderStaticLabels(){
  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    if(UI_STRINGS[key]) el.innerText = UI_STRINGS[key][currentLang];
  });
}

function renderHero(){
  document.getElementById("hero-title").innerText = D.hero.title;
  document.getElementById("hero-tagline").innerText = D.hero.tagline; // không đổi ngôn ngữ
  showRandomStatus();
}

let statusTimer = null;
function showRandomStatus(){
  const el = document.getElementById("status-text");
  const s = D.hero.statuses[Math.floor(Math.random()*D.hero.statuses.length)];
  el.dataset.vi = s.vi; el.dataset.en = s.en;
  el.innerText = t(s);
  if(statusTimer) clearInterval(statusTimer);
  statusTimer = setInterval(()=>{
    el.classList.add("fade");
    setTimeout(()=>{
      const next = D.hero.statuses[Math.floor(Math.random()*D.hero.statuses.length)];
      el.dataset.vi = next.vi; el.dataset.en = next.en;
      el.innerText = t(next);
      el.classList.remove("fade");
    }, 350);
  }, 4500);
}

function renderAbout(){
  document.querySelector("#about p").innerText = t(D.about);
}

function renderProjects(){
  const grid = document.getElementById("project-grid");
  grid.innerHTML = D.projects.map(p=>{
    const tagsHtml = p.tags.map(tag=>`<span class="tag">${tag}</span>`).join("");
    const inner = `
      <div class="project-banner ${p.bannerClass}">${p.bannerLetter}</div>
      <div class="project-body">
        <div class="tags">${tagsHtml}</div>
        <h3>${p.title}</h3>
        <p>${t(p.desc)}</p>
        <div class="project-link-hint">
          <span>${p.linkable ? UI_STRINGS.visit_link[currentLang] : UI_STRINGS.coming_soon[currentLang]}</span>
          ${p.linkable ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
        </div>
      </div>`;
    return p.linkable
      ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-card glass">${inner}</a>`
      : `<div class="project-card glass disabled">${inner}</div>`;
  }).join("");
}

function renderJourney(){
  const timeline = document.getElementById("journey-timeline");
  timeline.innerHTML = D.journey.map(j=>`
    <div class="t-item">
      <div class="t-year">${j.year}</div>
      <div class="t-title">${t(j.title)}</div>
      <div class="t-desc">${t(j.desc)}</div>
    </div>`).join("");
}

function renderContactInfo(){
  const c = D.contact;
  document.getElementById("info-card").innerHTML = `
    <div class="info-row">
      <div class="info-icon" id="email-icon" title="Click để hiện email">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6h18v12H3V6z" stroke="currentColor" stroke-width="1.6"/><path d="M3 6l9 7 9-7" stroke="currentColor" stroke-width="1.6"/></svg>
      </div>
      <div class="info-text">
        <b>EMAIL</b>
        <span id="email-value" class="info-hidden-hint">${UI_STRINGS.email_hint[currentLang]}</span>
      </div>
    </div>
    <div class="info-row">
      <div class="info-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9.5" r="2.3" stroke="currentColor" stroke-width="1.6"/></svg>
      </div>
      <div class="info-text"><b>${UI_STRINGS.location_label[currentLang]}</b><span>${c.location}</span></div>
    </div>
    <div class="info-row">
      <a class="info-icon" href="${c.facebook.url}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 8h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3h2v7h3v-7h2.3l.7-3H14v-2c0-.6.4-1 1-1z" fill="currentColor"/></svg>
      </a>
      <div class="info-text"><b>FACEBOOK</b><span>${c.facebook.label}</span></div>
    </div>
    <div class="info-row">
      <a class="info-icon" href="${c.youtube.url}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 12s0-3.2-.4-4.7c-.2-.9-1-1.6-1.9-1.8C17.9 5 12 5 12 5s-5.9 0-7.7.5c-.9.2-1.7.9-1.9 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9 1 1.6 1.9 1.8C6.1 19 12 19 12 19s5.9 0 7.7-.5c.9-.2 1.7-.9 1.9-1.8.4-1.5.4-4.7.4-4.7z" stroke="currentColor" stroke-width="1.4"/><path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor"/></svg>
      </a>
      <div class="info-text"><b>YOUTUBE</b><span>${c.youtube.label}</span></div>
    </div>
    <div class="info-row">
      <a class="info-icon" href="${c.tiktok.url}" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 3v10.5a3.5 3.5 0 1 1-3-3.46V7a6.5 6.5 0 1 0 5 6.32V9.5c1 .65 2.1 1 3 1V7.5c-1.4 0-3-1.2-3-3V3h-2z" fill="currentColor"/></svg>
      </a>
      <div class="info-text"><b>TIKTOK</b><span>${c.tiktok.label}</span></div>
    </div>`;

  document.getElementById("email-icon").addEventListener("click", ()=>{
    const el = document.getElementById("email-value");
    el.innerText = c.email;
    el.classList.remove("info-hidden-hint");
    el.classList.add("info-reveal");
  });
}

function renderSkills(){
  const s = D.skills;
  const tagsHtml = s.tags.map(tag=>`<span class="skill-pill">${tag}</span>`).join("");
  const barsHtml = s.bars.map(b=>`
    <div class="power-col">
      <div class="power-bar"><div class="power-fill" data-target="${b.pct}"></div></div>
      <div class="power-pct">${b.pct}%</div>
      <div class="power-label">${b.label}</div>
    </div>`).join("");
  document.getElementById("skills-card").innerHTML = `
    <h4>${UI_STRINGS.experience_title[currentLang]}</h4>
    <div class="skill-tags">${tagsHtml}</div>
    <div class="power-cols">${barsHtml}</div>`;

  const fills = document.querySelectorAll(".power-fill");
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        fills.forEach(f=> f.style.height = f.dataset.target + "%");
        observer.disconnect();
      }
    });
  }, {threshold:0.4});
  observer.observe(document.getElementById("skills-card"));
}

function renderTopics(){
  const list = document.getElementById("topic-list");
  list.innerHTML = D.contact.topics.map(topic=>`
    <label class="topic-chip">
      <input type="checkbox" name="Chủ đề[]" value="${topic.vi}">
      <span>${t(topic)}</span>
    </label>`).join("");
  list.querySelectorAll(".topic-chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      const input = chip.querySelector("input");
      input.checked = !input.checked;
      chip.classList.toggle("checked", input.checked);
    });
  });
}

function renderForm(){
  document.getElementById("contact-form").setAttribute("action", D.contact.formEndpoint);
  renderTopics();
}

function renderFooter(){
  document.getElementById("site-footer").innerHTML = D.footer.replace(
    "DMCF", `<b>DMCF</b>`
  );
}

function renderMusic(){
  const audio = document.getElementById("bgm-audio");
  audio.setAttribute("src", D.music.file);
  document.getElementById("music-tip").innerText = D.music.tooltip;
}

function renderBlogFallback(){
  const grid = document.getElementById("blog-grid");
  grid.innerHTML = D.blog.fallback.map(p=>`
    <a class="blog-card glass" href="${D.blog.blogHomeUrl}" target="_blank" rel="noopener">
      <div class="blog-thumb">blog.dungx8.click</div>
      <div class="blog-body">
        <h4>${t(p)}</h4>
        <span>${UI_STRINGS.read_on_blog[currentLang]}</span>
      </div>
    </a>`).join("");
}

let blogItemsCache = null;
function renderBlog(){
  document.getElementById("blog-more-link").setAttribute("href", D.blog.blogHomeUrl);
  const grid = document.getElementById("blog-grid");

  if(blogItemsCache){
    paintBlogItems(blogItemsCache);
    return;
  }
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(D.blog.feedUrl)}`)
    .then(r=>r.json())
    .then(data=>{
      if(data.status === "ok" && data.items && data.items.length){
        blogItemsCache = data.items.slice(0,3);
        paintBlogItems(blogItemsCache);
      } else {
        renderBlogFallback();
      }
    })
    .catch(renderBlogFallback);
}
function paintBlogItems(items){
  const grid = document.getElementById("blog-grid");
  grid.innerHTML = items.map(item=>{
    const img = item.thumbnail || (item.enclosure && item.enclosure.link) || "";
    return `
    <a class="blog-card glass" href="${item.link}" target="_blank" rel="noopener">
      <div class="blog-thumb" style="${img ? `background-image:url('${img}');background-size:cover;background-position:center;` : ""}">${img ? "" : "blog.dungx8.click"}</div>
      <div class="blog-body">
        <h4>${item.title}</h4>
        <span>${new Date(item.pubDate).toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US")}</span>
      </div>
    </a>`;
  }).join("");
}

function renderAll(){
  renderStaticLabels();
  renderHero();
  renderAbout();
  renderProjects();
  renderJourney();
  renderContactInfo();
  renderSkills();
  renderForm();
  renderFooter();
  renderMusic();
  renderBlog();
}

/* ---------- 2. ĐỔI NGÔN NGỮ ---------- */
document.getElementById("lang-btn").addEventListener("click", ()=>{
  currentLang = currentLang === "vi" ? "en" : "vi";
  document.getElementById("lang-btn").innerText = currentLang === "vi" ? "VI" : "EN";
  document.documentElement.lang = currentLang;
  renderAll();
});

/* ---------- 3. NỀN SAO CHUYỂN ĐỘNG (nebula + twinkle + comet) ---------- */
const starsCanvas = document.getElementById("stars-canvas");
const sctx = starsCanvas.getContext("2d");
let sw = innerWidth, sh = innerHeight, stars = [], comet = null;

function initStars(){
  sw = innerWidth; sh = innerHeight;
  starsCanvas.width = sw; starsCanvas.height = sh;
  stars = [];
  const count = Math.floor((sw*sh)/9000);
  for(let i=0;i<count;i++){
    stars.push({
      x: Math.random()*sw, y: Math.random()*sh,
      size: Math.random()*1.6+0.3,
      speedX:(Math.random()-0.5)*0.08,
      speedY:(Math.random()-0.5)*0.08,
      twinkle: Math.random()*0.02+0.004,
      alpha: Math.random()
    });
  }
}
function maybeSpawnComet(){
  if(!comet && Math.random()<0.0025){
    const fromLeft = Math.random()<0.5;
    comet = {
      x: fromLeft? -50 : sw+50, y: Math.random()*sh*0.5,
      vx: fromLeft? (Math.random()*4+3) : -(Math.random()*4+3),
      vy: Math.random()*2+1.2, life:1
    };
  }
}
function drawStars(){
  sctx.clearRect(0,0,sw,sh);
  sctx.fillStyle = "#ffffff";
  stars.forEach(s=>{
    s.alpha += s.twinkle;
    if(s.alpha>1||s.alpha<0.15) s.twinkle=-s.twinkle;
    s.x+=s.speedX; s.y+=s.speedY;
    if(s.x>sw)s.x=0; if(s.x<0)s.x=sw;
    if(s.y>sh)s.y=0; if(s.y<0)s.y=sh;
    sctx.globalAlpha = Math.abs(s.alpha);
    sctx.fillRect(s.x,s.y,s.size,s.size);
  });
  sctx.globalAlpha=1;
  maybeSpawnComet();
  if(comet){
    comet.x+=comet.vx; comet.y+=comet.vy; comet.life-=0.006;
    const grad = sctx.createLinearGradient(comet.x,comet.y,comet.x-comet.vx*14,comet.y-comet.vy*14);
    grad.addColorStop(0,"rgba(255,255,255,0.9)");
    grad.addColorStop(1,"rgba(255,255,255,0)");
    sctx.strokeStyle=grad; sctx.lineWidth=2; sctx.lineCap="round";
    sctx.beginPath();
    sctx.moveTo(comet.x,comet.y);
    sctx.lineTo(comet.x-comet.vx*14, comet.y-comet.vy*14);
    sctx.stroke();
    sctx.fillStyle="#fff";
    sctx.beginPath(); sctx.arc(comet.x,comet.y,1.6,0,Math.PI*2); sctx.fill();
    if(comet.life<=0 || comet.x<-100 || comet.x>sw+100 || comet.y>sh+100) comet=null;
  }
  requestAnimationFrame(drawStars);
}

/* ---------- 4. HIỆU ỨNG SAO BĂNG THEO CHUỘT ---------- */
const trailCanvas = document.getElementById("trail-canvas");
const tctx = trailCanvas.getContext("2d");
trailCanvas.width = innerWidth; trailCanvas.height = innerHeight;
let particles = [];
const glow = document.getElementById("cursor-glow");

window.addEventListener("mousemove", e=>{
  glow.style.opacity = 1;
  glow.style.left = e.clientX+"px";
  glow.style.top = e.clientY+"px";
  for(let i=0;i<2;i++){
    particles.push({
      x:e.clientX, y:e.clientY,
      vx:(Math.random()-0.5)*1.2, vy:(Math.random()-0.5)*1.2,
      alpha:1, size:Math.random()*2+0.6,
      color: Math.random()>0.5? "#5fd0ff":"#b28dff"
    });
  }
});
window.addEventListener("mouseleave", ()=> glow.style.opacity = 0);

function animateTrail(){
  tctx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    p.x+=p.vx; p.y+=p.vy; p.alpha-=0.018;
    if(p.alpha<=0){particles.splice(i,1); i--; continue;}
    tctx.save();
    tctx.globalAlpha=p.alpha;
    tctx.beginPath();
    tctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    tctx.fillStyle=p.color;
    tctx.shadowBlur=6; tctx.shadowColor=p.color;
    tctx.fill();
    tctx.restore();
  }
  requestAnimationFrame(animateTrail);
}

window.addEventListener("resize", ()=>{
  initStars();
  trailCanvas.width=innerWidth; trailCanvas.height=innerHeight;
});

/* ---------- 5. NHẠC NỀN ---------- */
let isPlaying = false;
function setupMusic(){
  const bgmAudio = document.getElementById("bgm-audio");
  bgmAudio.volume = 0.6;

  function updateMusicIcon(){
    document.getElementById("music-icon-on").style.display = isPlaying ? "block":"none";
    document.getElementById("music-icon-off").style.display = isPlaying ? "none":"block";
  }
  bgmAudio.addEventListener("play", ()=>{ isPlaying=true; updateMusicIcon(); });
  bgmAudio.addEventListener("pause", ()=>{ isPlaying=false; updateMusicIcon(); });

  bgmAudio.play().catch(()=>{ /* trình duyệt chặn autoplay có tiếng */ });

  document.getElementById("music-btn").addEventListener("click", (e)=>{
    e.stopPropagation();
    if(isPlaying){ bgmAudio.pause(); } else { bgmAudio.play(); }
  });

  function tryPlayOnce(){
    if(!isPlaying){ bgmAudio.play().catch(()=>{}); }
    document.body.removeEventListener("click", tryPlayOnce);
  }
  document.body.addEventListener("click", tryPlayOnce);
}

/* ---------- 6. NAV ACTIVE KHI CUỘN ---------- */
function setupNavObserver(){
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["about","project","journey","blog","contact"].map(id=>document.getElementById(id));
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if(active) active.classList.add("active");
      }
    });
  }, {rootMargin:"-45% 0px -45% 0px"});
  sections.forEach(s=> s && navObserver.observe(s));
}

/* ---------- 7. KHỞI ĐỘNG ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  renderAll();
  initStars(); drawStars(); animateTrail();
  setupMusic();
  setupNavObserver();
});
