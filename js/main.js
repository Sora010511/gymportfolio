// ページ全体が読み込まれてから実行
window.addEventListener('load', () => {
    
    // 1. AOSの初期化
    // これを実行しないと data-aos をつけた要素が透明のままになります
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 100,      // 要素が画面に入ってから動き出すまでの距離
            duration: 800,    // アニメーションの速度
            easing: 'ease-out',
            once: true,       // 1回だけ実行
        });
        
        // 描画バグ防止のため、初期化直後にリフレッシュを実行
        AOS.refresh();
    }
});

// DOMContentLoaded（HTMLの読み込み完了時）
document.addEventListener('DOMContentLoaded', () => {

    // 2. スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Q&Aアコーディオン開閉時のAOSリフレッシュ
    // detailsタグが開いてページの高さが変わった際、AOSの検知位置を修正します
    const details = document.querySelectorAll('details');
    details.forEach(target => {
        target.addEventListener('toggle', () => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
});