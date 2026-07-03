// Target date: July 16, 2026 at 00:00 (midnight)
const targetDate = new Date('2026-07-02T00:00:00').getTime();

const gallerySlides = [
    { image: 'https://images.unsplash.com/photo-1579353977991-54fc0f51b torre-bc-c?w=800&q=80', caption: 'Chương 1: Khởi đầu' },
    { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Chương 2: Hành trình' },
    { image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', caption: 'Chương 3: Thách thức' },
    { image: 'https://images.unsplash.com/photo-1495716519097-d71bc96db9d7?w=800&q=80', caption: 'Chương 4: Tia sáng hy vọng' },
    { image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', caption: 'Chương 5: Kết thúc vinh quang' }
];

let currentSlide = 0;

// Khởi tạo
function initApp() {
    const app = document.getElementById('app');
    const now = new Date().getTime();
    
    if (now < targetDate) {
        app.innerHTML = createCountdownHTML();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        app.innerHTML = createGalleryHTML();
        document.body.classList.add('gallery-mode');
        initGallery();
    }
}

// Countdown
function createCountdownHTML() {
    return `
        <div class="countdown-container">
            <div class="moon-section">
                <img src="https://phasesmoon.com/moonpng/220/moon-phase-11.webp" alt="Moon Phase" class="moon-image">
            </div>
            <div class="countdown-content">
                <h1>MISSION LAUNCHING ON</h1>
                <div class="countdown-timer">
                    <div class="time-unit"><span class="time-value" id="days">00</span><span class="time-label">DAYS</span></div>
                    <div class="time-unit"><span class="time-value" id="hours">00</span><span class="time-label">HOURS</span></div>
                    <div class="time-unit"><span class="time-value" id="minutes">00</span><span class="time-label">MINUTES</span></div>
                    <div class="time-unit"><span class="time-value" id="seconds">00</span><span class="time-label">SECONDS</span></div>
                </div>
                <p class="countdown-message">
                    <strong>✨ Đang chờ ngày đặc biệt của em bé Chloe ✨</strong><br>
                    Hãy quay lại vào <strong>16.07.2026</strong><br><br>
                    Wednesday, July 16, 1997<br>
		    Moon phase: Waxing Gibbous • 87.3% Visible<br>
                    Moonrise 4:22 PM • Moonset 12:57 AM<br>
		    Horoscope is ♋ Cancer

                </p>
            </div>
        </div>
    `;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) { location.reload(); return; }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Tạo HTML cho gallery (có nút điều hướng ở dưới)
function createGalleryHTML() {
    return `
        <div class="gallery-container">
            <div class="gallery-header">
                <h1>Của Chúng Tôi</h1>
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
                
                <div class="carousel-controls bottom-controls">
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
	// Auto-play will start in initGallery
}

// Khởi tạo gallery - SỬA LỖI CLICK
function initGallery() {
    // Đợi một chút để DOM cập nhật
    setTimeout(() => {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');

        if (prevBtn) prevBtn.addEventListener('click', previousSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }, 100);
	// Auto-play carousel
    setInterval(nextSlide, 8000);
	
}

// Chuyển slide tiếp theo
function nextSlide() {
    currentSlide = (currentSlide + 1) % gallerySlides.length;
    updateSlide();
}

// Quay lại slide trước
function previousSlide() {
    currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
    updateSlide();
}

// Đi đến slide cụ thể
function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

// Cập nhật giao diện slide
function updateSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) slide.classList.add('active');
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) indicator.classList.add('active');
    });
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
 
