document.addEventListener('DOMContentLoaded', () => {
    const greatDeedInput = document.getElementById('greatDeedInput');
    const addDeedBtn = document.getElementById('addDeedBtn');
    const deedList = document.getElementById('deedList');
    const saveDeedsBtn = document.getElementById('saveDeedsBtn');
    const loadDeedsBtn = document.getElementById('loadDeedsBtn');
    const clearDeedsBtn = document.getElementById('clearDeedsBtn');

    let deeds = [];

    // えらいことをリストに追加する関数
    const renderDeeds = () => {
        deedList.innerHTML = '';
        deeds.forEach((deed, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${deed}</span>
                <button class="delete-btn" data-index="${index}">x</button>
            `;
            deedList.appendChild(li);
        });
    };

    // 新しい「えらいこと」を追加
    const addDeed = () => {
        const newDeed = greatDeedInput.value.trim();
        if (newDeed) {
            deeds.push(newDeed);
            greatDeedInput.value = '';
            renderDeeds();
        }
    };

    addDeedBtn.addEventListener('click', addDeed);
    greatDeedInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addDeed();
        }
    });

    // 「えらいこと」を削除
    deedList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            deeds.splice(index, 1);
            renderDeeds();
        }
    });

    // 「えらいこと」をローカルストレージに保存
    saveDeedsBtn.addEventListener('click', () => {
        localStorage.setItem('greatDeeds', JSON.stringify(deeds));
        alert('✨ えらいことリストを保存しました！');
    });

    // ローカルストレージから「えらいこと」を読み込み
    loadDeedsBtn.addEventListener('click', () => {
        const savedDeeds = localStorage.getItem('greatDeeds');
        if (savedDeeds) {
            deeds = JSON.parse(savedDeeds);
            renderDeeds();
            alert('📂 えらいことリストを読み込みました！');
        } else {
            alert('保存されたえらいことリストはありません。');
        }
    });

    // リストを空にする
    clearDeedsBtn.addEventListener('click', () => {
        if (confirm('本当にえらいことリストを空にしますか？')) {
            deeds = [];
            renderDeeds();
            alert('リストを空にしました。またえらいことをたくさんしよう！');
        }
    });

    // ページロード時に自動的に読み込みを試みる
    loadDeedsBtn.click();
});
