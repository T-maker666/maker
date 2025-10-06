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
