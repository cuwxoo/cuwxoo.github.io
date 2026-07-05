// Target date: July 16, 2026 at 00:00 (midnight)
const targetDate = new Date('2026-07-03T00:00:00').getTime();

const gallerySlides = [
    { image: 'https://images.unsplash.com/photo-1782612920864-30b1004aadd4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 1: Khởi đầu' },
    { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Chương 2: Hành trình' },
    { image: 'https://images.unsplash.com/photo-1782763558195-caa1373561c2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 3: Thách thức' },
    { image: 'https://images.unsplash.com/photo-1783003530150-7afebe59feb5?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 4: Tia sáng hy vọng' },
    { image: 'https://images.unsplash.com/photo-1781285909142-b335421c2fdb?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 5: Kết thúc vinh quang' },
    { image: 'https://images.unsplash.com/photo-1782141748753-42e6d6b1abab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 6: Kết thúc vinh quang' },
    { image: 'https://images.unsplash.com/photo-1782766330033-67ef615c3741?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 7: Kết thúc vinh quang' },
    { image: 'https://images.unsplash.com/photo-1782791895550-1522288a20f6?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Chương 8: Kết thúc vinh quang' }
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
        initPlanetClicks();
    }
}
// Khởi tạo Particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 120, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.6, "random": true },
            "size": { "value": 2.5, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 0.4,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "bubble" },
                "onclick": { "enable": true, "mode": "repulse" },
                "resize": true
            }
        },
        "retina_detect": true
    });
}

// Countdown
function createCountdownHTML() {
    return `
        <div class="countdown-container">
       
            <div class="countdown-content">
                <h1>MISSION LAUNCHING ON</h1>
                <div class="countdown-timer">
                    <div class="time-unit"><span class="time-value" id="days">00</span><span class="time-label">DAYS</span></div>
                    <div class="time-unit"><span class="time-value" id="hours">00</span><span class="time-label">HOURS</span></div>
                    <div class="time-unit"><span class="time-value" id="minutes">00</span><span class="time-label">MINUTES</span></div>
                    <div class="time-unit"><span class="time-value" id="seconds">00</span><span class="time-label">SECONDS</span></div>
                </div>
		<div class="moon-section">
                <img src="https://phasesmoon.com/moonpng/220/moon-phase-11.webp" alt="Moon Phase" class="moon-image">
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

    setTimeValue('days', days);
    setTimeValue('hours', hours);
    setTimeValue('minutes', minutes);
    setTimeValue('seconds', seconds);
}

// Cập nhật một ô số và tạo hiệu ứng "nhảy" mỗi giây
function setTimeValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = String(value).padStart(2, '0');

    // Restart the tick animation on every update
    el.classList.remove('tick');
    void el.offsetWidth; // force reflow so the animation can replay
    el.classList.add('tick');
}

// Tạo Gallery sau 16/07/2026 - Hệ Mặt Trời 8 hành tinh

function createGalleryHTML() {
    return `
        <div class="solar-system-container">
            <div class="title-section">
                <h1>Happy Birthday Embe Chloe</h1>
		<p>Mỗi hành tinh ẩn chứa một điều bí mật nho nhỏ</p>
                <p>Chạm vào các hành tinh để khám phá</p>
            </div>
            
            <div class="solar-system">
                <div class="sun"></div>
                
                <div class="orbit orbit-1"><div class="planet real-planet" data-index="0">🌑</div></div>
                <div class="orbit orbit-2"><div class="planet real-planet" data-index="1">🪐</div></div>
                <div class="orbit orbit-3"><div class="planet real-planet" data-index="2">🌍</div></div>
                <div class="orbit orbit-4"><div class="planet real-planet" data-index="3">🔴</div></div>
                <div class="orbit orbit-5"><div class="planet real-planet" data-index="4">☄️</div></div>
                <div class="orbit orbit-6"><div class="planet real-planet" data-index="5">🪐</div></div>
                <div class="orbit orbit-7"><div class="planet real-planet" data-index="6">🔵</div></div>
                <div class="orbit orbit-8"><div class="planet real-planet" data-index="7">🟣</div></div>
            </div>
        </div>
    `;
}

// Khởi tạo click sau khi render
function initPlanetClicks() {
    setTimeout(() => {
        // Give each orbit a random starting angle so planets never line up
        document.querySelectorAll('.orbit').forEach(orbit => {
            const randomAngle = Math.floor(Math.random() * 360);
            orbit.style.setProperty('--start-angle', randomAngle + 'deg');
            orbit.classList.add('animate');
        });

        document.querySelectorAll('.real-planet').forEach(planet => {
            planet.style.cursor = 'pointer';
            planet.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                showPlanetPopup(index);
            });
        });

        // Click the sun to open the birthday invitation
        const sun = document.querySelector('.sun');
        if (sun) {
            sun.addEventListener('click', function(e) {
                e.stopPropagation();
                showSunInvitation();
            });
        }
    }, 100);
}

// Đóng popup kèm hiệu ứng
function closePopup(popup) {
    popup.classList.add('closing');
    setTimeout(() => popup.remove(), 220);
}

function showPlanetPopup(index) {
    const slide = gallerySlides[index % gallerySlides.length];
    
    const popup = document.createElement('div');
    popup.className = 'planet-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup">✕</button>
            <img src="${slide.image}" alt="${slide.caption}">
            <h2>${slide.title || slide.caption}</h2>
            <p>${slide.caption}</p>
            <p>Chương ${index + 1} của hành trình đặc biệt</p>
        </div>
    `;
    
    document.body.appendChild(popup);

    // Close button
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => closePopup(popup));

    // Click outside content to close
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
    });
}

// Thiệp mời khi bấm vào mặt trời
function showSunInvitation() {
    const popup = document.createElement('div');
    popup.className = 'planet-popup';
    popup.innerHTML = `
        <div class="popup-content invitation-content">
            <button class="close-popup">✕</button>
            <div class="invitation-icon">🎂</div>
            <h2>Thiệp Mời Sinh Nhật</h2>
            <p class="invitation-subtitle">Bé Chloe tròn tuổi đầu tiên!</p>
            <div class="invitation-divider">✦ ✦ ✦</div>
            <p>Trân trọng kính mời bạn đến chung vui trong ngày đặc biệt của bé Chloe</p>
            <p class="invitation-date">📅 16.07.2026</p>
            <p class="invitation-note">Sự hiện diện của bạn là món quà quý giá nhất 💛</p>
        </div>
    `;

    document.body.appendChild(popup);
    createConfetti();

    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => closePopup(popup));

    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
    });
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
    const colors = ['#c41e3a', '#ffd700', '#e91e63', '#ff6b9d', '#ffa500', '#4fc3f7', '#8bc34a'];

    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti' + (Math.random() > 0.5 ? ' circle' : '');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--drift', (Math.random() * 220 - 110) + 'px');

        const size = 6 + Math.random() * 7;
        confetti.style.width = size + 'px';
        confetti.style.height = (size * 1.4) + 'px';

        const duration = 2.4 + Math.random() * 2.2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = Math.random() * 0.4 + 's';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), (duration + 0.6) * 1000);
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
initParticles();
 function showPlanetContent(index) {
    const slide = gallerySlides[index];
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="planet-detail">
            <button onclick="backToSolarSystem()" class="back-btn">← Quay lại</button>
            <img src="${slide.image}" alt="${slide.caption}" class="detail-image">
            <h2>${slide.caption}</h2>
            <p>Chương ${index + 1} của hành trình đặc biệt của chúng ta</p>
        </div>
    `;
}

function backToSolarSystem() {
    const app = document.getElementById('app');
    app.innerHTML = createGalleryHTML();
}
