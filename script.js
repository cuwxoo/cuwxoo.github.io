// Target date: July 16, 2026 at 00:00 (midnight)
const targetDate = new Date('2026-07-02T00:00:00').getTime();

const gallerySlides = [
    { 
        image: 'https://images.unsplash.com/photo-1579353977991-54fc0f51b1a8?w=800&q=80', 
        caption: 'Chương 1: Khởi đầu',
        blessing: '✨ Mỗi hành trình đều bắt đầu từ một bước nhỏ ✨'
    },
    { 
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 
        caption: 'Chương 2: Hành trình',
        blessing: '🌈 Những chuyến đi cùng nhau tạo nên kỷ niệm đẹp 🌈'
    },
    { 
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', 
        caption: 'Chương 3: Thách thức',
        blessing: '💪 Vượt qua khó khăn cùng nhau mới là sức mạnh 💪'
    },
    { 
        image: 'https://images.unsplash.com/photo-1495716519097-d71bc96db9d7?w=800&q=80', 
        caption: 'Chương 4: Tia sáng hy vọng',
        blessing: '🌟 Hy vọng luôn chiếu sáng những ngày tối tăm 🌟'
    },
    { 
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&q=80', 
        caption: 'Chương 5: Kết thúc vinh quang',
        blessing: '🎉 Những khoảnh khắc đẹp sẽ mãi in đậm trong lòng 🎉'
    }
];

let currentSlide = 0;
let showingInvitation = false;

function initApp() {
    const app = document.getElementById('app');
    const now = new Date().getTime();
    
    if (now < targetDate) {
        app.innerHTML = createCountdownHTML();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        app.innerHTML = createGalleryHTML();
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
                <h1>🎂 NGÀY ĐẶC BIỆT SẮP TỚI 🎂</h1>
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
    if (distance < 0) { 
        location.reload(); 
        return; 
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Gallery
function createGalleryHTML() {
    return `
        <div class="gallery-container">
            <div class="gallery-header">
                <h1>💕 Của Chúng Tôi 💕</h1>
                <p>Một hành trình đầy ý nghĩa</p>
            </div>
            
            <div class="carousel-wrapper">
                <div class="carousel-container">
                    ${gallerySlides.map((slide, index) => `
                        <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                            <img src="${slide.image}" alt="${slide.caption}">
                            <div class="slide-caption">${slide.caption}</div>
                            <div class="slide-blessing">${slide.blessing}</div>
                        </div>
                    `).join('')}
                    
                    <div class="blessing-slide">
                        <div class="blessing-text">
                            🎉 Cảm ơn bạn đã đồng hành! 🎉<br>
                            Một ngày đặc biệt đang chờ chúng ta
                        </div>
                        <button class="open-letter-btn" onclick="showEnvelope()">Mở Thư Mời 💌</button>
                    </div>
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

function initGallery() {
    setTimeout(() => {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');

        if (prevBtn) prevBtn.addEventListener('click', previousSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        setInterval(autoNextSlide, 8000);
    }, 100);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % (gallerySlides.length + 1);
    updateSlide();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + gallerySlides.length + 1) % (gallerySlides.length + 1);
    updateSlide();
}

function autoNextSlide() {
    currentSlide = (currentSlide + 1) % (gallerySlides.length + 1);
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

function updateSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const blessingSlide = document.querySelector('.blessing-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
    });
    
    if (blessingSlide) {
        blessingSlide.classList.remove('active');
    }

    if (currentSlide < gallerySlides.length) {
        slides[currentSlide].classList.add('active');
    } else {
        if (blessingSlide) {
            blessingSlide.classList.add('active');
        }
    }

    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

function showEnvelope() {
    const app = document.getElementById('app');
    app.innerHTML = createClosedEnvelopeHTML();
}

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

function openEnvelope() {
    const envelope = document.getElementById('envelopeContainer');
    envelope.classList.add('opened');
    
    setTimeout(() => {
        const app = document.getElementById('app');
        app.innerHTML = createInvitationHTML();
        createConfetti();
    }, 800);
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
                    
                    <p class="invitation-text" style="font-style: italic;">
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

function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0e0', '#ffa3d0', '#ff80ab'];
    
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

function confirmRsvp() {
    alert('Cảm ơn bạn! 🎉\n\nChúng ta sẽ gặp nhau vào ngày 16/7/2026!\n\nChúc bạn một ngày tuyệt vời! 💝');
}

function shareInvitation() {
    const message = 'Bạn được mời dự tiệc sinh nhật đặc biệt! Vào ngày 16/7/2026. Hãy cùng chúng tôi tưng bừng chào đón! 🎉✨';
    
    if (navigator.share) {
        navigator.share({
            title: 'Thư Mời Sinh Nhật',
            text: message,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(message + '\n' + window.location.href).then(() => {
            alert('Đã copy thư mời vào clipboard! 📋');
        });
    }
}

document.addEventListener('DOMContentLoaded', initApp);
