// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header show/hide on scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    let activeTab = 'artist'; // デフォルトのアクティブタブ

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const clickedTabId = tab.getAttribute('data-tab');

            // 同じタブをクリックした場合
            if (activeTab === clickedTabId && tab.classList.contains('active')) {
                // タブとコンテンツの active クラスを削除
                tab.classList.remove('active');
                document.getElementById(clickedTabId).classList.remove('active');
                activeTab = null;
                return;
            }

            // 他のタブをクリックした場合
            // すべてのタブとコンテンツから active クラスを削除
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // クリックされたタブとそのコンテンツに active クラスを追加
            tab.classList.add('active');
            document.getElementById(clickedTabId).classList.add('active');
            activeTab = clickedTabId;
        });
    });
});
