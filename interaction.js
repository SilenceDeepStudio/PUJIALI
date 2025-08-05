document.addEventListener('DOMContentLoaded', function () {
  // 1. 选项卡切换功能 (优化版)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      const targetContent = document.getElementById(tabId);

      // 先隐藏所有内容
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      // 移除所有按钮的活动状态
      tabBtns.forEach(btn => btn.classList.remove('active'));

      // 添加当前按钮的活动状态
      this.classList.add('active');

      // 显示目标内容
      targetContent.classList.add('active');
    });
  });

  // 2. 证书轮播功能
  const track = document.querySelector('.certificate-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const items = document.querySelectorAll('.certificate-item');

  if (track && prevBtn && nextBtn && items.length > 0) {
    const itemWidth = items[0].offsetWidth;
    let position = 0;
    const maxPosition = -(items.length - 3) * itemWidth;

    // 优化轮播性能
    prevBtn.addEventListener('click', function () {
      if (position < 0) {
        position = Math.min(position + itemWidth, 0);
        track.style.transform = `translateX(${position}px)`;
      }
    });

    nextBtn.addEventListener('click', function () {
      if (position > maxPosition) {
        position = Math.max(position - itemWidth, maxPosition);
        track.style.transform = `translateX(${position}px)`;
      }
    });
  }

  // 3. 添加淡入动画
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    // 为元素添加will-change属性以优化性能
    element.style.willChange = 'opacity, transform';
    // 设置动画延迟
    element.style.animationDelay = `${index * 0.1}s`;
  });

  // 4. 图片懒加载功能
  function lazyLoadImages(tabId) {
    const tabContent = document.getElementById(tabId);
    if (!tabContent) return;

    const lazyImages = tabContent.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      // 使用Intersection Observer优化懒加载
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
    });
  }

  // 5. 预加载所有选项卡图片
  function preloadAllImages() {
    const allTabImages = document.querySelectorAll('.tab-content img[data-src]');
    allTabImages.forEach(img => {
      const preloader = new Image();
      preloader.src = img.getAttribute('data-src');
    });
  }

  // 初始化：预加载所有图片
  preloadAllImages();

  // 初始化：为活动选项卡加载图片
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab) {
    lazyLoadImages(activeTab.id);
  }
});