console.log('スクリプトが読み込まれました');

// Firebase SDKの設定
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
console.log('Firebase初期化を開始します');
let db; // db変数をトップレベルで宣言

// Firebase初期化関数
function initializeFirebase() {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('Firebaseの初期化が完了しました');
            
            db = firebase.firestore(); // dbインスタンスを初期化時に取得
            console.log('Firestoreの初期化が完了しました');
            
            if (firebase.analytics) {
                const analytics = firebase.analytics();
                console.log('Analytics初期化完了');
            }
            return true;
        } else {
            console.log('Firebaseは既に初期化されています');
            db = firebase.firestore();
            return true;
        }
    } catch (error) {
        console.error('Firebaseの初期化中にエラーが発生しました:', error);
        return false;
    }
}

// フォーム処理の設定関数
function setupContactForm() {
    console.log('フォーム処理の設定を開始します');
    
    const form = document.querySelector('.contact-form');
    console.log('フォーム要素:', form);
    
    if (!form) {
        console.error('フォーム要素が見つかりません');
        return;
    }
    
    console.log('フォームが見つかりました');
    
    // submitイベントの設定
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('フォームのsubmitイベントが発生しました');
        
        // フォームデータの取得と表示
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        console.log('入力値:', {
            name: name,
            email: email,
            subject: subject,
            message: message
        });
        
        // FirebaseとFirestoreが利用可能か確認
        if (typeof firebase !== 'undefined') {
            // Firebase初期化を確認し、必要に応じて初期化
            const isInitialized = db || initializeFirebase();
            
            if (isInitialized) {
                console.log('FirebaseとFirestoreは利用可能です');
                try {
                    const formData = {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp() // サーバータイムスタンプを使用
                    };
                    
                    console.log('保存するデータ:', formData);
                    
                    // Firestoreにデータを保存
                    const docRef = await db.collection('contacts').add(formData);
                    console.log('ドキュメントが追加されました。ID:', docRef.id);
                    
                    // 成功時の処理
                    alert('お問い合わせありがとうございます。メッセージが送信されました。');
                    form.reset();
                    
                } catch (error) {
                    console.error('Firestoreへの保存中にエラーが発生しました:', error);
                    alert(`申し訳ありません。送信に失敗しました。エラー: ${error.message}`);
                }
            } else {
                console.error('Firebaseの初期化に失敗しました');
                alert('システムエラーが発生しました。Firebaseの初期化に失敗しました。');
            }
        } else {
            console.error('Firebaseが見つかりません');
            alert('システムエラーが発生しました。Firebaseが見つかりません。');
        }
    });
    
    // 送信ボタンのクリックイベントも監視
    const submitButton = form.querySelector('.submit-btn');
    if (submitButton) {
        console.log('送信ボタンが見つかりました');
        submitButton.addEventListener('click', () => {
            console.log('送信ボタンがクリックされました');
        });
    } else {
        console.error('送信ボタンが見つかりません');
    }
}

// DOM読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoadedイベントが発生しました');
    
    // Firebase初期化
    initializeFirebase();
    
    // タブ機能の設定
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
    
    // スムーススクロール
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
    
    // フォーム処理の設定
    setupContactForm();
});

// ページが完全に読み込まれた時の処理（DOMContentLoadedが発火しなかった場合の保険）
window.addEventListener('load', () => {
    console.log('ウィンドウのloadイベントが発生しました');
    // フォーム処理がまだ設定されていない場合に設定
    if (!document.querySelector('.contact-form')?.hasAttribute('data-form-initialized')) {
        setupContactForm();
    }
});
