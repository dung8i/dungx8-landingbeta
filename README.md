# tranthiendung.dev — Portfolio website

Website cá nhân của Trần Thiên Dũng: nền milky way động, hiệu ứng chuột, đổi ngôn ngữ VI/EN, nhạc nền, các mục About / Project / Journey / Blog / Contact, và một trang quản trị nội dung (`admin.html`).

## 📁 Cấu trúc thư mục

```
├── index.html          # Trang chính
├── admin.html          # Trang quản trị nội dung (chỉnh sửa data.js)
├── css/
│   ├── style.css        # Toàn bộ style của trang chính
│   └── admin.css        # Style riêng cho trang admin
├── js/
│   ├── data.js           # NỘI DUNG website (text, dự án, journey, liên hệ...)
│   ├── main.js            # Logic + hiệu ứng của trang chính (đọc từ data.js)
│   └── admin.js           # Logic của trang quản trị
├── audio/
│   └── bgm.mp3           # Nhạc nền
└── README.md
```

`data.js` là nơi **duy nhất** chứa nội dung hiển thị (tiêu đề, dự án, timeline, thông tin liên hệ, kỹ năng...). `main.js` chỉ đọc dữ liệu từ đó để vẽ ra trang — nên muốn đổi nội dung, bạn chỉ cần sửa `data.js` (thủ công hoặc qua `admin.html`), không cần đụng vào HTML/CSS/JS logic.

## 🚀 Publish lên GitHub Pages

1. Tạo repo mới trên GitHub, ví dụ `tranthiendung-portfolio`.
2. Upload **toàn bộ** các file/thư mục ở trên vào repo (giữ nguyên cấu trúc thư mục).
3. Vào **Settings → Pages** của repo.
4. Ở mục **Source**, chọn nhánh `main` (hoặc `master`) và thư mục `/root`.
5. Bấm **Save**. Sau khoảng 1 phút, GitHub sẽ cấp cho bạn link dạng:
   `https://<tên-github-của-bạn>.github.io/tranthiendung-portfolio/`
6. (Tuỳ chọn) Nếu bạn có domain riêng (VD: `dungx8.click`), vào **Settings → Pages → Custom domain** để trỏ domain về, rồi cấu hình DNS (CNAME record trỏ về `<tên-github>.github.io`).

## ✏️ Cách chỉnh nội dung web

Có 2 cách:

### Cách 1 — Sửa trực tiếp `js/data.js`
Mở file bằng bất kỳ trình soạn thảo nào (VS Code, Notepad++...), sửa giá trị cần thiết, lưu lại, commit + push lên GitHub. Trang sẽ tự cập nhật sau khi GitHub Pages build xong (thường vài chục giây tới vài phút).

### Cách 2 — Dùng trang quản trị `admin.html`
1. Mở `admin.html` (chạy local bằng cách mở file trực tiếp trong trình duyệt, hoặc mở qua link đã publish, ví dụ `https://.../admin.html`).
2. Nhập mật khẩu quản trị (mặc định: `dungx8admin` — **đổi mật khẩu này trong `js/admin.js`, biến `ADMIN_PASSWORD`, trước khi publish**).
3. Chỉnh nội dung trong các panel (Hero, About, Dự án, Hành trình, Blog, Liên hệ, Kỹ năng...).
4. Cuộn xuống cuối trang, bấm **"Tạo nội dung data.js"** → bấm **"Tải xuống data.js"** (hoặc **"Copy nội dung"**).
5. Thay file `js/data.js` trong repo bằng nội dung vừa xuất, commit + push lên GitHub.

> ⚠️ **Quan trọng — cần hiểu đúng bản chất:** GitHub Pages là hosting **tĩnh** (static hosting), không có server/database phía sau. Vì vậy trang `admin.html` **không thể tự động lưu thay đổi lên server** — nó chỉ giúp bạn soạn nội dung ngay trên giao diện trực quan rồi xuất ra file để bạn tự thay + commit. Đây là cách làm chuẩn cho các site tĩnh không có backend.
>
> ⚠️ Mật khẩu ở `admin.html` chỉ là rào chắn nhẹ phía trình duyệt (client-side) — bất kỳ ai xem mã nguồn JS đều có thể thấy mật khẩu. Nó không bảo vệ được dữ liệu nhạy cảm thật sự. Nếu cần một trang quản trị có xác thực an toàn và lưu dữ liệu thật (ví dụ để duyệt tin nhắn liên hệ), bạn sẽ cần thêm một backend nhỏ (Cloudflare Workers, Firebase, Supabase...) — cho biết nếu bạn muốn phát triển thêm hướng này.

## 📩 Tin nhắn từ form liên hệ

Form liên hệ dùng dịch vụ miễn phí [FormSubmit](https://formsubmit.co/) — khi có người gửi form, nội dung sẽ được gửi thẳng vào email `thiendung1092008@gmail.com` (đổi trong `data.js` → `contact.formEndpoint` nếu cần). Lần gửi đầu tiên, FormSubmit sẽ gửi 1 email xác nhận — bạn cần bấm xác nhận 1 lần thì các lần sau mới tự động vào inbox.

## 🎵 Nhạc nền

File nhạc nằm ở `audio/bgm.mp3`, tự phát khi vào trang (một số trình duyệt sẽ chặn autoplay có âm thanh cho tới khi người dùng tương tác — đây là giới hạn của trình duyệt, trang đã xử lý fallback tự phát ngay khi có click đầu tiên).
