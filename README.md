# Countdown & Gallery Website

Một website đơn giản hiển thị countdown cho tới 0:00 ngày 16/7/2026, sau đó sẽ chuyển sang gallery carousel kể chuyện bằng hình ảnh.

## 📋 Tính năng

### Countdown (Trước 16/7/2026 0:00)
- Đếm ngược theo ngày, giờ, phút, giây
- Design hiện đại với animation mượt mà
- Background gradient đẹp mắt
- Responsive trên mobile

### Gallery (Từ 16/7/2026 0:00 trở đi)
- Carousel slideshow 5 hình ảnh
- Tự động chuyển slide sau 8 giây
- Điều khiển bằng nút Previous/Next
- Indicator points để chọn slide
- Caption cho mỗi slide

## 🚀 Cách setup với GitHub Pages

### 1. Tạo repository mới
- Vào GitHub, tạo new repository tên `username.github.io` (thay `username` bằng tên GitHub của bạn)
- Hoặc nếu dùng project page, tên có thể là bất kỳ
- Chọn "Public" repository

### 2. Clone repository
```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

### 3. Copy files vào folder
Copy 4 file này vào folder:
- `index.html`
- `style.css`
- `script.js`
- `.gitignore`

### 4. Push lên GitHub
```bash
git add .
git commit -m "Initial commit: countdown and gallery website"
git push origin main
```

### 5. Enable GitHub Pages
- Vào **Settings** của repository
- Tìm **Pages** (bên trái)
- Source chọn **main branch**
- Chọn folder **/ (root)**
- Nhấn Save
- Website sẽ hoạt động sau vài phút tại: `https://username.github.io/`

## 🎨 Tùy chỉnh

### Thay đổi hình ảnh gallery
Mở file `script.js` và tìm phần `gallerySlides`. Thay đổi URL hình ảnh:

```javascript
const gallerySlides = [
    {
        image: 'URL_HINH_ANH_1',
        caption: 'Chương 1: Tên bạn muốn'
    },
    // ... thêm các slide khác
];
```

### Thay đổi màu sắc
Mở file `style.css` và tìm:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Thay đổi color codes này */
}
```

### Thay đổi thời gian countdown
Mở `script.js`, dòng đầu tiên:
```javascript
const targetDate = new Date('2026-07-16T00:00:00').getTime();
```

### Tắt auto-play carousel (tự động chuyển)
Mở `script.js`, tìm dòng:
```javascript
setInterval(nextSlide, 8000); // Xóa dòng này để tắt
```

## 📸 Nguồn hình ảnh placeholder
Website hiện dùng hình từ Unsplash. Bạn có thể:
- Thay bằng URL từ Unsplash
- Thay bằng URL từ Imgur, Cloudinary, v.v.
- Upload hình lên GitHub (tạo folder `/images` và commit)

## 🔧 Troubleshooting

**Website không cập nhật countdown?**
- Kiểm tra timezone của máy (JavaScript dùng local time)
- Tính toán lại: 2026-07-16 00:00:00 bằng timezone nào?

**Hình ảnh không load?**
- Kiểm tra URL hình có đúng không (copy đầy đủ)
- Một số host ảnh có thể chặn hotlink

**GitHub Pages chưa hoạt động?**
- Chờ 1-2 phút sau khi enable
- Kiểm tra tên repository có đúng format không (`username.github.io`)

## 📝 License

Dùng tự do cho mục đích cá nhân. Có thể sửa đổi tùy ý.

---

Chúc bạn thành công! 🎉
