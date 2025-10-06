document.addEventListener('DOMContentLoaded', function() {
    const face = document.querySelector('.face');
    const pupils = document.querySelectorAll('.pupil');
    const mouth = document.querySelector('.mouth');
    const tears = document.querySelectorAll('.tear');
    const acceptBtn = document.querySelector('.accept');
    const rejectBtn = document.querySelector('.reject');
    const moon = document.querySelector('.moon');
    const container = document.querySelector('.container');
    const body = document.querySelector('body');
    const celebration = document.querySelector('.celebration');
    const audioTip = document.getElementById('audioTip');
    
    let audioEnabled = false;
    
    // 启用音频的提示
    function showAudioTip() {
        if (!audioEnabled) {
            audioTip.style.opacity = '1';
            setTimeout(() => {
                audioTip.style.opacity = '0';
            }, 3000);
        }
    }
    
    // 眼睛跟随鼠标/触摸移动
    function updateEyes(x, y) {
        pupils.forEach(pupil => {
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const angle = Math.atan2(y - eyeCenterY, x - eyeCenterX);
            const distance = Math.min(10, 
                Math.sqrt(Math.pow(x - eyeCenterX, 2) + Math.pow(y - eyeCenterY, 2)) / 20);
            
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    }
    
    // 鼠标移动
    document.addEventListener('mousemove', function(e) {
        updateEyes(e.clientX, e.clientY);
    });
    
    // 触摸移动（手机端）
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            updateEyes(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    
    // 启用音频
    document.addEventListener('click', function() {
        if (!audioEnabled) {
            audioEnabled = true;
            audioTip.textContent = '音效已启用！';
            audioTip.style.opacity = '1';
            setTimeout(() => {
                audioTip.style.opacity = '0';
            }, 2000);
        }
    });
    
    // 鼠标/触摸悬停在按钮上时改变表情
    function setupButtonHover(button, isAccept) {
        button.addEventListener('mouseenter', function() {
            if (isAccept) {
                mouth.classList.add('excited');
                tears.forEach(tear => tear.style.opacity = '0');
                face.style.background = '#FFD700';
                face.style.transform = 'scale(1.1)';
            } else {
                mouth.style.height = '10px';
                mouth.style.borderRadius = '40px 40px 40px 40px';
                tears.forEach(tear => tear.style.opacity = '1');
                face.style.background = '#FFB6C1';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (isAccept) {
                mouth.classList.remove('excited');
                face.style.background = '#FFD700';
                face.style.transform = 'scale(1)';
            } else {
                mouth.style.height = '40px';
                mouth.style.borderRadius = '0 0 40px 40px';
                tears.forEach(tear => tear.style.opacity = '0');
                face.style.background = '#FFD700';
            }
        });
        
        // 触摸设备支持
        button.addEventListener('touchstart', function() {
            if (isAccept) {
                mouth.classList.add('excited');
                tears.forEach(tear => tear.style.opacity = '0');
                face.style.background = '#FFD700';
                face.style.transform = 'scale(1.1)';
            } else {
                mouth.style.height = '10px';
                mouth.style.borderRadius = '40px 40px 40px 40px';
                tears.forEach(tear => tear.style.opacity = '1');
                face.style.background = '#FFB6C1';
            }
        });
    }
    
    setupButtonHover(acceptBtn, true);
    setupButtonHover(rejectBtn, false);
    
    // 点击拒绝按钮时随机移动位置
    rejectBtn.addEventListener('click', function() {
        const maxX = window.innerWidth - rejectBtn.offsetWidth - 20;
        const maxY = window.innerHeight - rejectBtn.offsetHeight - 20;
        
        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));
        
        rejectBtn.style.position = 'fixed';
        rejectBtn.style.left = `${randomX}px`;
        rejectBtn.style.top = `${randomY}px`;
        
        showAudioTip();
    });
    
    // 点击接受按钮时显示圆月和烟花
    acceptBtn.addEventListener('click', function() {
        // 更改背景为夜空
        body.style.background = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
      // 显示圆月
        moon.style.opacity = '1';
        
        // 创建烟花效果
        createFireworks();
        
        // 显示庆祝画面
        setTimeout(() => {
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            
            setTimeout(() => {
                celebration.classList.add('active');
            }, 500);
        }, 1000);
        
        showAudioTip();
    });
    
    // 创建烟花效果
    function createFireworks() {
        const colors = ['#FF5252', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                
                for (let j = 0; j < 20; j++) {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    firework.style.background = color;
                    
                    firework.style.left = `${startX}px`;
                    firework.style.top = `${startY}px`;
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 30 + Math.random() * 70;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    
                    firework.style.setProperty('--tx', `${tx}px`);
                    firework.style.setProperty('--ty', `${ty}px`);
                    
                    const size = 2 + Math.random() * 6;
                    firework.style.width = `${size}px`;
                    firework.style.height = `${size}px`;
                    
                    firework.style.animation = `explode ${0.5 + Math.random() * 1}s ease-out forwards`;
                    
                    document.body.appendChild(firework);
                    
                    setTimeout(() => {
                        if (firework.parentNode) {
                            firework.remove();
                        }
                    }, 1500);
                }
                
                // 播放烟花声音（模拟）
                if (audioEnabled && i % 5 === 0) {
                    playFireworkSound();
                }
                
            }, i * 200);
        }
    }
    
    // 播放烟花声音（使用Web Audio API模拟）
    function playFireworkSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('音频播放失败');
        }
    }
    
    // 初始显示音频提示
    setTimeout(showAudioTip, 1000);
});
```  