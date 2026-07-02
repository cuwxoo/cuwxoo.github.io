// Target date: July 16, 2026 at 00:00 (midnight)
const targetDate = new Date('2026-07-16T00:00:00').getTime();

// Gallery slides data
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
    
    const now = new Date().getTime();
    
    if (now < targetDate) {
        // Chưa đến thời gian -> Hiển thị countdown
        app.innerHTML = createCountdownHTML();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        // Đã qua thời gian -> Hiển thị gallery
        app.innerHTML = createGalleryHTML();
        initGallery();
    }
}

// Tạo HTML cho countdown
function createCountdownHTML() {
    return `
        <div class="countdown-container">
            <div class="moon-section">
                <img src="https://phasesmoon.com/moonpng/220/moon-phase-11.webp" 
                     alt="Moon Phase" class="moon-image">
            </div>
            <div class="countdown-content">
                <h1>MISSION LAUNCHING ON</h1>
                <div class="countdown-timer">
                    <div class="time-unit">
                        <span class="time-value" id="days">00</span>
                        <span class="time-label">DAYS</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="hours">00</span>
                        <span class="time-label">HOURS</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="minutes">00</span>
                        <span class="time-label">MINUTES</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-value" id="seconds">00</span>
                        <span class="time-label">SECONDS</span>
                    </div>
                </div>
                <p class="countdown-message">
                    <strong>✨ Đang chờ ngày đặc biệt của em bé Chloe ✨</strong><br>
                    Hãy quay lại vào <strong>16.07.2026</strong><br><br>
                    On 16.07.1997, Moon phase: Waxing Gibbous • 87.3% Visible<br>
                    Moonrise 4:22 PM • Moonset 12:57 AM
                </p>
            </div>
        </div>
    `;
}

// Cập nhật countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        location.reload();
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
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

// Các hàm còn lại giữ nguyên (thiệp mời, gallery, confetti...)
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
    
    setInterval(nextSlide, 8000);
}

// Các hàm gallery, envelope, invitation, confetti... (giữ nguyên như cũ)
function nextSlide() { /* ... */ }
function previousSlide() { /* ... */ }
function showInvitation() { /* ... */ }
function openEnvelope() { /* ... */ }
function goToSlide(index) { /* ... */ }
function updateSlide() { /* ... */ }
function createConfetti() { /* ... */ }
function confirmRsvp() { /* ... */ }
function shareInvitation() { /* ... */ }

// Khởi động
document.addEventListener('DOMContentLoaded', initApp);
