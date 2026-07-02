// Target date: July 16, 2026 at 00:00 (midnight)
const targetDate = new Date('2026-07-16T00:00:00').getTime();

// Gallery slides data - dễ dàng thay đổi
const gallerySlides = [
    {
        image: 'https://images.unsplash.com/photo-1579353977991-54fc0f51b torre-bc-c?w=800&q=80',
        caption: 'Chương 1: Khởi đầu'
    },
    {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        caption: 'Chương 2: Hành trình'
    },
    {
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
        caption: 'Chương 3: Thách thức'
    },
    {
        image: 'https://images.unsplash.com/photo-1495716519097-d71bc96db9d7?w=800&q=80',
        caption: 'Chương 4: Tia sáng hy vọng'
    },
    {
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80',
        caption: 'Chương 5: Kết thúc vinh quang'
    }
];

let currentSlide = 0;
let showingInvitation = false;

// Khởi tạo app
function initApp() {
    const app = document.getElementById('app');
    
    // Kiểm tra thời gian hiện tại
    const now = new Date().getTime();
    
    if (now < targetDate) {
        // Chưa đến thời gian -> Hiển thị countdown
        app.innerHTML = createCountdownHTML();
        updateCountdown();
        // Cập nhật countdown mỗi 1 giây
        setInterval(updateCountdown, 1000);
    } else {
        // Đã qua thời gian -> Hiển thị gallery
        app.innerHTML = createGalleryHTML();
        initGallery();
    }
}

// Tạo HTML cho countdown (NASA style với mặt trăng)
// Tạo HTML cho countdown (NASA style)
function createCountdownHTML() {
    return `
        <div class="countdown-container nasa-style">
            <div class="mission-header">
                <img src="https://phasesmoon.com/moonpng/220/moon-phase-11.webp" 
                     alt="Mặt Trăng" class="moon-image">
                <div class="mission-text">
                    <div class="nasa-logo">🌕 BIRTHDAY MISSION</div>
                    <h1 class="mission-title">SỰ KIỆN ĐẶC BIỆT</h1>
                    <p class="launching-on">ĐANG KHỞI HÀNH VÀO NGÀY</p>
                    <div class="target-date">16.07.2026</div>
                </div>
            </div>
            
            <div class="countdown-timer">
                <div class="time-unit">
                    <span class="time-value" id="days">00</span>
                    <span class="time-label">NGÀY</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="hours">00</span>
                    <span class="time-label">GIỜ</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="minutes">00</span>
                    <span class="time-label">PHÚT</span>
                </div>
                <div class="time-unit">
                    <span class="time-value" id="seconds">00</span>
                    <span class="time-label">GIÂY</span>
                </div>
            </div>
            
            <div class="mission-footer">
                <button onclick="showInvitationEarly()" class="watch-btn">MỞ THƯ MỜI ✨</button>
            </div>
        </div>
    `;
}

// Cập nhật countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Nếu đã hết thời gian countdown
    if (distance < 0) {
        location.reload(); // Reload trang để hiển thị gallery
        return;
    }
    
    // Tính toán thời gian còn lại
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Cập nhật HTML
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Tạo HTML cho gallery
function createGalleryHTML() {
    return `
        <div class="gallery-container">
            <div class="gallery-header">
                <h1>📖 Câu Chuyện Của Chúng Tôi</h1>
                <p>Một hành trình đầy ý nghĩa</p>
            </div>
            
            <div class="carousel-wrapper">
                <div class="carousel-container">
                    ${gallerySlides.map((slide, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                            <img src="${slide.image}" alt="${slide.caption}">
                            <div class="slide-caption">${slide.caption}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="carousel-controls">
                    <button class="carousel-btn" id="prevBtn">← Trước</button>
                    <div class="carousel-indicators">
                        ${gallerySlides.map((_, index) => `
                            <div class="indicator ${index === 0 ? 'active' : ''}" 
                                 data-slide="${index}"></div>
                        `).join('')}
                    </div>
                    <button class="carousel-btn" id="nextBtn">Tiếp →</button>
                </div>
            </div>
        </div>
    `;
}

// Tạo HTML cho thiệp đóng
function createClosedEnvelopeHTML() {
    return `
        <div class="envelope-wrapper">
            <div class="envelope-container" id="envelopeContainer" onclick="openEnvelope()">
                <div class="envelope-flap"></div>
                <div class="envelope-front">
                    <div class="envelope-content">
                        <div class="envelope-icon">💌</div>
                        <div class="envelope-text">Thư Mời Cho Bạn</div>
                        <div class="envelope-subtext">Một điều kỳ diệu đang chờ bạn</div>
                        <div class="envelope-hint">✨ Bấm vào để mở thư ✨</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Tạo HTML cho thư mời sinh nhật
function createInvitationHTML() {
    return `
        <div class="invitation-container">
            <div class="invitation-card">
                <div class="invitation-content">
                    <div class="invitation-decoration">🎉✨🎂</div>
                    
                    <h1 class="invitation-title">Mời Bạn Dự Tiệc</h1>
                    <p class="invitation-subtitle">Một ngày đặc biệt của chúng ta</p>
                    
                    <div class="invitation-divider"></div>
                    
                    <p class="invitation-text">
                        Cảm ơn bạn đã đồng hành cùng tôi qua những chương của câu chuyện này.<br>
                        Hôm nay là ngày đặc biệt, và tôi muốn chia sẻ khoảnh khắc này cùng bạn.
                    </p>
                    
                    <div class="invitation-details">
                        <div class="detail-row">
                            <span class="detail-icon">📅</span>
                            <span><strong>Ngày:</strong> 16 tháng 7, 2026</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-icon">🕐</span>
                            <span><strong>Giờ:</strong> 00:00 (Nửa đêm)</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-icon">📍</span>
                            <span><strong>Địa điểm:</strong> Trong tim của chúng ta</span>
                        </div>
                    </div>
                    
                    <p class="invitation-text" style="font-style: italic; color: #666;">
                        Hãy cùng chúng tôi tưng bừng chào đón một ngày mới,<br>
                        với những điều kỳ diệu sắp tới.
                    </p>
                    
                    <div class="invitation-rsvp">
                        <button class="rsvp-btn rsvp-btn-primary" onclick="confirmRsvp()">
                            Tôi sẽ tham gia 💝
                        </button>
                        <button class="rsvp-btn rsvp-btn-secondary" onclick="shareInvitation()">
                            Chia sẻ 💌
                        </button>
                    </div>
                    
                    <div class="invitation-decoration-bottom">🎈 🎁 🌟</div>
                </div>
            </div>
        </div>
    `;
}

// Khởi tạo gallery
function initGallery() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    prevBtn.addEventListener('click', previousSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel (tùy chọn)
    setInterval(nextSlide, 8000); // Tự động chuyển slide sau 8 giây
}

// Chuyển sang slide tiếp theo
function nextSlide() {
    if (showingInvitation) {
        currentSlide = 0;
        showingInvitation = false;
        const app = document.getElementById('app');
        app.innerHTML = createGalleryHTML();
        initGallery();
        return;
    }
    
    currentSlide = currentSlide + 1;
    
    // Nếu vượt quá số lượng slide -> hiển thị thư mời
    if (currentSlide >= gallerySlides.length) {
        showInvitation();
    } else {
        updateSlide();
    }
}

// Quay lại slide trước
function previousSlide() {
    if (showingInvitation) {
        showingInvitation = false;
        currentSlide = gallerySlides.length - 1;
        const app = document.getElementById('app');
        app.innerHTML = createGalleryHTML();
        initGallery();
        return;
    }
    
    currentSlide = currentSlide - 1;
    
    if (currentSlide < 0) {
        currentSlide = gallerySlides.length - 1;
    }
    
    updateSlide();
}

// Hiển thị thư mời sinh nhật (thiệp đóng trước)
function showInvitation() {
    showingInvitation = true;
    const app = document.getElementById('app');
    app.innerHTML = createClosedEnvelopeHTML();
}

// Mở thiệp
function openEnvelope() {
    const envelope = document.getElementById('envelopeContainer');
    envelope.classList.add('opened');
    
    // Sau khi animation xong, hiển thị nội dung thư mời
    setTimeout(() => {
        const app = document.getElementById('app');
        app.innerHTML = createInvitationHTML();
        createConfetti();
    }, 800);
}

// Đi tới slide cụ thể
function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

// Cập nhật hiển thị slide
function updateSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

// Hiệu ứng confetti khi hiển thị thư mời
function createConfetti() {
    const colors = ['#c41e3a', '#ffd700', '#e91e63', '#ff6b9d', '#ffa500'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3500);
    }
}

// Xác nhận tham gia
function confirmRsvp() {
    alert('Cảm ơn bạn! 🎉\n\nChúng ta sẽ gặp nhau vào ngày 16/7/2026!\n\nChúc bạn một ngày tuyệt vời! 💝');
}

// Chia sẻ thư mời
function shareInvitation() {
    const message = 'Bạn được mời dự tiệc sinh nhật đặc biệt! Vào ngày 16/7/2026. Hãy cùng chúng tôi tưng bừng chào đón! 🎉✨';
    
    if (navigator.share) {
        navigator.share({
            title: 'Thư Mời Sinh Nhật',
            text: message,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(message + '\n' + window.location.href).then(() => {
            alert('Đã copy thư mời vào clipboard! 📋');
        });
    }
}

// Khởi động app khi DOM ready
document.addEventListener('DOMContentLoaded', initApp);
