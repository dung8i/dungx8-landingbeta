/* ======================================================================
   admin.js
   Lưu ý quan trọng: GitHub Pages là hosting TĨNH, không có backend/database.
   Vì vậy trang admin này KHÔNG lưu trực tiếp lên server — nó chỉ giúp bạn
   soạn nội dung rồi xuất ra file data.js mới để bạn tự thay thế & commit.
   Mật khẩu bên dưới CHỈ là rào chắn nhẹ (ai đọc source cũng thấy được),
   không phải cơ chế bảo mật thật sự. Đừng dùng để bảo vệ dữ liệu nhạy cảm.
   ====================================================================== */

const ADMIN_PASSWORD = "D113d114*"; // đổi mật khẩu này tùy ý trước khi publish

let workingData = JSON.parse(JSON.stringify(window.SITE_DATA)); // bản nháp đang chỉnh

/* ---------- GATE ---------- */
const gate = document.getElementById("gate");
const app = document.getElementById("admin-app");

function openApp(){
  gate.style.display = "none";
  app.style.display = "block";
  loadFormFromData(workingData);
}
if(sessionStorage.getItem("admin_ok") === "1") openApp();

document.getElementById("gate-btn").addEventListener("click", tryLogin);
document.getElementById("gate-pass").addEventListener("keydown", e=>{ if(e.key === "Enter") tryLogin(); });
function tryLogin(){
  const val = document.getElementById("gate-pass").value;
  if(val === ADMIN_PASSWORD){
    sessionStorage.setItem("admin_ok","1");
    openApp();
  } else {
    document.getElementById("gate-error").innerText = "Sai mật khẩu, thử lại.";
  }
}
document.getElementById("logout-btn").addEventListener("click", ()=>{
  sessionStorage.removeItem("admin_ok");
  location.reload();
});
document.getElementById("reload-btn").addEventListener("click", ()=>{
  if(confirm("Tải lại dữ liệu gốc từ data.js? Mọi thay đổi chưa xuất sẽ mất.")){
    workingData = JSON.parse(JSON.stringify(window.SITE_DATA));
    loadFormFromData(workingData);
    toast("Đã tải lại dữ liệu gốc.");
  }
});

function toast(msg){
  const el = document.getElementById("toast");
  el.innerText = msg;
  el.classList.add("show");
  setTimeout(()=> el.classList.remove("show"), 2200);
}

/* ---------- HELPER: tạo khối item có nút xóa ---------- */
function makeRemovable(container, html){
  const div = document.createElement("div");
  div.className = "item-block";
  div.innerHTML = html + `<button class="btn btn-sm btn-danger remove-btn" type="button">Xóa</button>`;
  div.querySelector(".remove-btn").addEventListener("click", ()=> div.remove());
  container.appendChild(div);
  return div;
}

/* ---------- HERO STATUSES ---------- */
function addStatusRow(status = {vi:"",en:""}){
  const container = document.getElementById("status-list");
  makeRemovable(container, `
    <div class="item-block-title">Trạng thái</div>
    <div class="field-row">
      <div><label>Tiếng Việt</label><input type="text" class="st-vi" value="${escapeAttr(status.vi)}"></div>
      <div><label>Tiếng Anh</label><input type="text" class="st-en" value="${escapeAttr(status.en)}"></div>
    </div>`);
}
document.getElementById("add-status").addEventListener("click", ()=> addStatusRow());

/* ---------- PROJECTS ---------- */
const BANNER_OPTIONS = ["banner-savyo","banner-fpv","banner-agri"];
function addProjectRow(p = {id:"",title:"",tags:[],desc:{vi:"",en:""},link:"",linkable:false,bannerLetter:"", bannerClass:"banner-savyo"}){
  const container = document.getElementById("project-list");
  const options = BANNER_OPTIONS.map(o=>`<option value="${o}" ${o===p.bannerClass?"selected":""}>${o}</option>`).join("");
  makeRemovable(container, `
    <div class="item-block-title">Dự án</div>
    <div class="field-row">
      <div><label>Tên dự án</label><input type="text" class="pj-title" value="${escapeAttr(p.title)}"></div>
      <div><label>Tags (phân cách bằng dấu phẩy)</label><input type="text" class="pj-tags" value="${escapeAttr(p.tags.join(", "))}"></div>
    </div>
    <div class="field-row">
      <div><label>Mô tả (Tiếng Việt)</label><textarea class="pj-desc-vi" rows="2">${escapeHtml(p.desc.vi)}</textarea></div>
      <div><label>Mô tả (English)</label><textarea class="pj-desc-en" rows="2">${escapeHtml(p.desc.en)}</textarea></div>
    </div>
    <div class="field-row">
      <div><label>Link (để trống nếu chưa có)</label><input type="text" class="pj-link" value="${escapeAttr(p.link)}"></div>
      <div><label>Chữ cái + màu banner</label>
        <div style="display:flex;gap:8px;">
          <input type="text" class="pj-letter" maxlength="2" value="${escapeAttr(p.bannerLetter)}" style="width:60px;">
          <select class="pj-banner">${options}</select>
        </div>
      </div>
    </div>
    <div class="checkbox-row"><input type="checkbox" class="pj-linkable" ${p.linkable?"checked":""}><label style="margin:0;">Có thể click mở link</label></div>`);
}
document.getElementById("add-project").addEventListener("click", ()=> addProjectRow());

/* ---------- JOURNEY ---------- */
function addJourneyRow(j = {year:"",title:{vi:"",en:""},desc:{vi:"",en:""}}){
  const container = document.getElementById("journey-list");
  makeRemovable(container, `
    <div class="item-block-title">Mốc thời gian</div>
    <div class="field-row">
      <div><label>Năm</label><input type="text" class="jn-year" value="${escapeAttr(j.year)}"></div>
      <div></div>
    </div>
    <div class="field-row">
      <div><label>Tiêu đề (VI)</label><input type="text" class="jn-title-vi" value="${escapeAttr(j.title.vi)}"></div>
      <div><label>Tiêu đề (EN)</label><input type="text" class="jn-title-en" value="${escapeAttr(j.title.en)}"></div>
    </div>
    <div class="field-row">
      <div><label>Mô tả (VI)</label><textarea class="jn-desc-vi" rows="2">${escapeHtml(j.desc.vi)}</textarea></div>
      <div><label>Mô tả (EN)</label><textarea class="jn-desc-en" rows="2">${escapeHtml(j.desc.en)}</textarea></div>
    </div>`);
}
document.getElementById("add-journey").addEventListener("click", ()=> addJourneyRow());

/* ---------- BLOG FALLBACK ---------- */
function addBlogFallbackRow(b = {vi:"",en:""}){
  const container = document.getElementById("blog-fallback-list");
  makeRemovable(container, `
    <div class="item-block-title">Bài dự phòng</div>
    <div class="field-row">
      <div><label>Tiếng Việt</label><input type="text" class="bf-vi" value="${escapeAttr(b.vi)}"></div>
      <div><label>Tiếng Anh</label><input type="text" class="bf-en" value="${escapeAttr(b.en)}"></div>
    </div>`);
}
document.getElementById("add-blog-fallback").addEventListener("click", ()=> addBlogFallbackRow());

/* ---------- TOPICS ---------- */
function addTopicRow(tp = {vi:"",en:""}){
  const container = document.getElementById("topic-list-admin");
  makeRemovable(container, `
    <div class="item-block-title">Chủ đề</div>
    <div class="field-row">
      <div><label>Tiếng Việt</label><input type="text" class="tp-vi" value="${escapeAttr(tp.vi)}"></div>
      <div><label>Tiếng Anh</label><input type="text" class="tp-en" value="${escapeAttr(tp.en)}"></div>
    </div>`);
}
document.getElementById("add-topic").addEventListener("click", ()=> addTopicRow());

/* ---------- SKILL BARS ---------- */
function addSkillBarRow(b = {label:"",pct:50}){
  const container = document.getElementById("skill-bars-list");
  makeRemovable(container, `
    <div class="item-block-title">Thanh kỹ năng</div>
    <div class="field-row">
      <div><label>Tên (VD: Python)</label><input type="text" class="sk-label" value="${escapeAttr(b.label)}"></div>
      <div><label>Phần trăm (0-100)</label><input type="number" min="0" max="100" class="sk-pct" value="${b.pct}"></div>
    </div>`);
}
document.getElementById("add-skill-bar").addEventListener("click", ()=> addSkillBarRow());

/* ---------- LOAD FORM TỪ DATA ---------- */
function loadFormFromData(d){
  document.getElementById("hero-title").value = d.hero.title;
  document.getElementById("hero-tagline").value = d.hero.tagline;
  document.getElementById("status-list").innerHTML = "";
  d.hero.statuses.forEach(addStatusRow);

  document.getElementById("about-vi").value = d.about.vi;
  document.getElementById("about-en").value = d.about.en;

  document.getElementById("project-list").innerHTML = "";
  d.projects.forEach(addProjectRow);

  document.getElementById("journey-list").innerHTML = "";
  d.journey.forEach(addJourneyRow);

  document.getElementById("blog-feed").value = d.blog.feedUrl;
  document.getElementById("blog-home").value = d.blog.blogHomeUrl;
  document.getElementById("blog-fallback-list").innerHTML = "";
  d.blog.fallback.forEach(addBlogFallbackRow);

  document.getElementById("contact-email").value = d.contact.email;
  document.getElementById("contact-location").value = d.contact.location;
  document.getElementById("fb-label").value = d.contact.facebook.label;
  document.getElementById("fb-url").value = d.contact.facebook.url;
  document.getElementById("yt-label").value = d.contact.youtube.label;
  document.getElementById("yt-url").value = d.contact.youtube.url;
  document.getElementById("tt-label").value = d.contact.tiktok.label;
  document.getElementById("tt-url").value = d.contact.tiktok.url;
  document.getElementById("form-endpoint").value = d.contact.formEndpoint;
  document.getElementById("topic-list-admin").innerHTML = "";
  d.contact.topics.forEach(addTopicRow);

  document.getElementById("skill-tags").value = d.skills.tags.join("\n");
  document.getElementById("skill-bars-list").innerHTML = "";
  d.skills.bars.forEach(addSkillBarRow);

  document.getElementById("music-file").value = d.music.file;
  document.getElementById("music-tooltip").value = d.music.tooltip;
  document.getElementById("footer-text").value = d.footer;

  document.getElementById("export-output").value = "";
}

/* ---------- ĐỌC FORM -> DỰNG LẠI OBJECT ---------- */
function collectFormToData(){
  const data = {};

  data.hero = {
    title: document.getElementById("hero-title").value.trim(),
    tagline: document.getElementById("hero-tagline").value.trim(),
    statuses: [...document.querySelectorAll("#status-list .item-block")].map(b=>({
      vi: b.querySelector(".st-vi").value.trim(),
      en: b.querySelector(".st-en").value.trim()
    }))
  };

  data.about = {
    vi: document.getElementById("about-vi").value.trim(),
    en: document.getElementById("about-en").value.trim()
  };

  data.projects = [...document.querySelectorAll("#project-list .item-block")].map((b,i)=>({
    id: "project-"+(i+1),
    title: b.querySelector(".pj-title").value.trim(),
    tags: b.querySelector(".pj-tags").value.split(",").map(s=>s.trim()).filter(Boolean),
    desc: {
      vi: b.querySelector(".pj-desc-vi").value.trim(),
      en: b.querySelector(".pj-desc-en").value.trim()
    },
    link: b.querySelector(".pj-link").value.trim(),
    linkable: b.querySelector(".pj-linkable").checked,
    bannerLetter: b.querySelector(".pj-letter").value.trim() || "?",
    bannerClass: b.querySelector(".pj-banner").value
  }));

  data.journey = [...document.querySelectorAll("#journey-list .item-block")].map(b=>({
    year: b.querySelector(".jn-year").value.trim(),
    title: { vi: b.querySelector(".jn-title-vi").value.trim(), en: b.querySelector(".jn-title-en").value.trim() },
    desc: { vi: b.querySelector(".jn-desc-vi").value.trim(), en: b.querySelector(".jn-desc-en").value.trim() }
  }));

  data.blog = {
    feedUrl: document.getElementById("blog-feed").value.trim(),
    blogHomeUrl: document.getElementById("blog-home").value.trim(),
    fallback: [...document.querySelectorAll("#blog-fallback-list .item-block")].map(b=>({
      vi: b.querySelector(".bf-vi").value.trim(),
      en: b.querySelector(".bf-en").value.trim()
    }))
  };

  data.contact = {
    email: document.getElementById("contact-email").value.trim(),
    location: document.getElementById("contact-location").value.trim(),
    facebook: { label: document.getElementById("fb-label").value.trim(), url: document.getElementById("fb-url").value.trim() },
    youtube: { label: document.getElementById("yt-label").value.trim(), url: document.getElementById("yt-url").value.trim() },
    tiktok: { label: document.getElementById("tt-label").value.trim(), url: document.getElementById("tt-url").value.trim() },
    formEndpoint: document.getElementById("form-endpoint").value.trim(),
    topics: [...document.querySelectorAll("#topic-list-admin .item-block")].map(b=>({
      vi: b.querySelector(".tp-vi").value.trim(),
      en: b.querySelector(".tp-en").value.trim()
    }))
  };

  data.skills = {
    tags: document.getElementById("skill-tags").value.split("\n").map(s=>s.trim()).filter(Boolean),
    bars: [...document.querySelectorAll("#skill-bars-list .item-block")].map(b=>({
      label: b.querySelector(".sk-label").value.trim(),
      pct: Number(b.querySelector(".sk-pct").value) || 0
    }))
  };

  data.music = {
    file: document.getElementById("music-file").value.trim(),
    tooltip: document.getElementById("music-tooltip").value.trim()
  };

  data.footer = document.getElementById("footer-text").value.trim();

  return data;
}

/* ---------- XUẤT FILE data.js ---------- */
function buildDataJsText(data){
  return `/* ======================================================================
   data.js — được xuất từ trang admin.html
   Toàn bộ nội dung "động" của website nằm ở đây (KHÔNG chứa hiệu ứng/logic).
   ====================================================================== */

window.SITE_DATA = ${JSON.stringify(data, null, 2)};
`;
}

document.getElementById("generate-btn").addEventListener("click", ()=>{
  const data = collectFormToData();
  const text = buildDataJsText(data);
  document.getElementById("export-output").value = text;
  toast("Đã tạo nội dung data.js — tải xuống hoặc copy để thay vào repo.");
});

document.getElementById("download-btn").addEventListener("click", ()=>{
  const text = document.getElementById("export-output").value || buildDataJsText(collectFormToData());
  const blob = new Blob([text], {type:"text/javascript"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "data.js";
  a.click();
  URL.revokeObjectURL(url);
  toast("Đã tải xuống data.js");
});

document.getElementById("copy-btn").addEventListener("click", ()=>{
  const text = document.getElementById("export-output").value || buildDataJsText(collectFormToData());
  navigator.clipboard.writeText(text).then(()=> toast("Đã copy nội dung data.js"));
});

/* ---------- Escape helpers (tránh vỡ HTML khi giá trị có ký tự đặc biệt) ---------- */
function escapeAttr(str){
  return String(str ?? "").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
}
function escapeHtml(str){
  return String(str ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
