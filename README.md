# 🏰 Eight Palace - Website Trung tâm Hội nghị & Tiệc cưới

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://eight-palace-rust.vercel.app/index.html)
> **Đồ án môn học:** Thiết kế Web (Front-end)
> **Mô tả:** Website giới thiệu và đặt tiệc trực tuyến cho trung tâm Eight Palace. Dự án kết hợp thiết kế sang trọng với các kỹ thuật lập trình hiện đại như Lazy Loading, Video Background Slider và Menu điều hướng dạng Modal.

🌟 Tính năng Nổi bật
1. Trải nghiệm Người dùng (UX/UI)
Hero Hybrid Slider (Trang chủ):

Kết hợp độc đáo giữa trượt ngang (3 slide đầu) và cuộn dọc (các phần nội dung sau).

Tích hợp Video Background tự động phát (autoplay muted) tạo hiệu ứng thị giác mạnh mẽ.

Hiệu ứng Scroll Snap giúp nội dung tự động bắt dính vào khung hình khi cuộn.

Mega Modal Menu:

Thanh điều hướng ẩn, xuất hiện dạng cửa sổ nổi (Modal) fixed giữa màn hình.

Tự động đóng khi click ra ngoài vùng nội dung (Click-outside detection).

Hiệu ứng Tương tác:

Nút mũi tên có hiệu ứng bounce (nảy) thu hút sự chú ý.

Hình ảnh phóng to nhẹ (scale) và đổ bóng khi di chuột (Hover effects).

2. Chức năng Các Trang
Trang Chủ: Tổng quan, Video giới thiệu, Danh sách dịch vụ nổi bật.

Sảnh Tiệc: Tích hợp Slideshow truyền thống (Next/Prev) để xem chi tiết không gian sảnh (Amore, Aimer, Rakkaus).

Thực Đơn: Trình bày món ăn dạng lưới (Grid Layout), hiển thị rõ hình ảnh và giá tiền.

Đặt Bàn:

Form đặt tiệc chi tiết (Ngày, Giờ, Số khách).

Giao diện chọn phong cách bài trí bàn tiệc trực quan.

Trang Trí & Dịch Vụ: Thư viện hình ảnh các mẫu trang trí và thông tin chi tiết các gói dịch vụ (Tiệc cưới, Hội nghị, Sự kiện).

📂 Cấu trúc Thư mục
```text
EIGHT-PALACE/
│
├── HTML/                       # Giao diện người dùng
│   ├── trangchu.html           # Trang chủ (Hybrid Slider)
│   ├── Sanh-tiec.html          # Sảnh tiệc & Slideshow
│   ├── Thucdon.html            # Thực đơn (Grid Layout)
│   ├── Datban.html             # Form đặt bàn
│   ├── Chi-tiet-gioi-thieu.html
│   ├── Tieccuoi.html
│   ├── Hoinghi.html
│   ├── Sukien.html
│   ├── Trangtri.html
│   └── UuDai.html
│
├── Assets/                     # Tài nguyên
│   ├── CSS/                    # Stylesheets
│   │   ├── trangchu.css        # Style cho Slider & Scroll Snap
│   │   ├── Sanh-tiec.css       # Style cho Slideshow
│   │   ├── Thucdon.css         # Style Grid món ăn
│   │   ├── Datban.css          # Style Form & Grid bài trí
│   │   ├── TieccuoiHoinghiSukien.css # Style dùng chung
│   │   ├── Gioithieu.css
│   │   ├── Trangtri.css
│   │   └── UuDai.css
│   │
│   ├── JS/                     # Scripts
│   │   ├── trangchu.js         # Logic Hybrid Slider & Lazy Load
│   │   ├── menudropdown.js     # Logic Modal Menu (Dùng chung)
│   │   └── Sanh-tiec.js        # Logic Slideshow sảnh tiệc
│   │
│   └── Images/                 # Hình ảnh & Video (.mp4)
│
└── README.md
```

🛠️ Công nghệ & Kỹ thuật
HTML5: Semantic Tags (header, nav, section, footer).

CSS3:

Layout: Sử dụng linh hoạt Flexbox (Navbar, Form) và Grid (Thực đơn, Trang trí).

Scroll Snap: scroll-snap-type: y proximity giúp trải nghiệm cuộn mượt mà.

Positioning: Sử dụng fixed cho Menu Modal và Navbar, absolute cho Video Background.

Variables: Sử dụng tông màu chủ đạo Vàng đồng #957b1c và Kem #fcfcfc.

JavaScript (Vanilla):

IntersectionObserver API: Kỹ thuật Lazy Loading hình ảnh giúp tăng tốc độ tải trang.

DOM Manipulation: Xử lý sự kiện click, scroll, wheel.

🧩 Giải thích Code (Code Highlights)
1. Logic Lazy Loading (Tối ưu hiệu năng)
Sử dụng IntersectionObserver để chỉ tải hình ảnh khi chúng xuất hiện trong khung nhìn (Viewport).

JavaScript

// trangchu.js
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Thay thế placeholder bằng ảnh thật
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});
2. Logic Menu Modal (Đóng/Mở thông minh)
Kiểm tra mục tiêu click (event.target) để xác định xem người dùng có click ra ngoài menu hay không.

JavaScript

// menudropdown.js
window.addEventListener('click', function(event) {
    // Nếu click KHÔNG trúng nút menu VÀ KHÔNG trúng bảng nội dung -> Đóng menu
    if (!menuToggle.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});
3. CSS Grid Layout (Thực đơn & Trang trí)
Sử dụng Grid để tạo bố cục lưới tự động điều chỉnh (auto-fit) trên các màn hình khác nhau.

CSS

/* Trangtri.css / Thucdon.css */
.danh-sach-anh {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

Dự án được thực hiện nhằm mục đích học tập.