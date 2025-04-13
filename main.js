document.addEventListener('DOMContentLoaded', () => {
    // 移动端菜单交互
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // 点击菜单项后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // 清除之前的定时器
        clearTimeout(scrollTimeout);
        
        // 滚动时添加透明效果
        if (currentScroll > 100) {
            header.style.background = 'rgba(139, 69, 19, 0.85)';
        } else {
            header.style.background = 'linear-gradient(135deg, #F5DEB3, #8B4513, #FF8C00)';
        }

        // 移动端滚动时隐藏导航栏
        if (window.innerWidth <= 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;

        // 设置定时器，滚动停止后恢复导航栏
        scrollTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                header.style.transform = 'translateY(0)';
            }
        }, 150);
    });

    // 时间感知背景色
    function updateBackgroundColor() {
        const hour = new Date().getHours();
        const hero = document.querySelector('.hero');
        
        if (hour >= 6 && hour < 18) {
            hero.style.filter = 'brightness(1)';
        } else {
            hero.style.filter = 'brightness(0.7)';
        }
    }

    updateBackgroundColor();
    setInterval(updateBackgroundColor, 60000);

    // 卡片交互效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if ('ontouchstart' in window) {
            // 触摸设备
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.95)';
            });
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });
        } else {
            // 非触摸设备
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        }
    });
}); 