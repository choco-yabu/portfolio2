// Firebase SDKのインポート
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyC4rs-cmHFaZN1evwZwhLcsguysfkBkTxA",
    authDomain: "portfolio-choco.firebaseapp.com",
    projectId: "portfolio-choco",
    storageBucket: "portfolio-choco.firebasestorage.app",
    messagingSenderId: "307601245866",
    appId: "1:307601245866:web:1d9902d1fc7877501472d3",
    measurementId: "G-XT53GW7XKE"
};

// Firebaseの初期化
console.log('Firebase初期化開始');
const app = initializeApp(firebaseConfig);
console.log('Firebaseアプリ初期化完了');

const analytics = getAnalytics(app);
console.log('Analytics初期化完了');

const db = getFirestore(app);
console.log('Firestore初期化完了');

const auth = getAuth(app);

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

// お問い合わせフォームの送信処理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('フォーム送信開始');

    // フォームデータの取得
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date()
    };

    console.log('送信するデータ:', formData);

    try {
        // Firestoreにデータを保存
        const contactsRef = collection(db, "contacts");
        console.log('コレクション参照作成');
        
        const docRef = await addDoc(contactsRef, formData);
        console.log("お問い合わせを送信しました。ID: ", docRef.id);
        
        // フォームをリセット
        contactForm.reset();
        
        // 送信完了メッセージを表示
        alert('お問い合わせありがとうございます。メッセージが送信されました。');
        
    } catch (error) {
        console.error("エラーが発生しました: ", error);
        alert('申し訳ありません。送信に失敗しました。もう一度お試しください。');
    }
});
