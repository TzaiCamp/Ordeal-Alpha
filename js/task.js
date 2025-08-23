document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'main.html';
});
/*
// 為四個任務 icon 添加點擊事件
document.querySelectorAll('.task-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const img = this.querySelector('img');
        const alt = img.getAttribute('alt');
        
        switch(alt) {
            case 'A1':
                window.location.href = 'A1.html';
                break;
            case 'A2':
                // window.location.href = 'A2.html';
                window.location.href = 'A2.html';
                break;
            case 'A3':
                // window.location.href = 'A3.html';
                window.location.href = 'A3.html';
                break;
            case 'A4':
                // window.location.href = 'A4.html';
                window.location.href = 'A4.html';
                break;
        }
    });
});
*/
// 這裡可擴充任務互動邏輯 

document.addEventListener('DOMContentLoaded', function() {
    // 檢查 localStorage 標記
    const doneList = ['A1', 'A2', 'A3', 'A4', 'A6'];
    doneList.forEach(key => {
        const img = document.querySelector('.task-icon img[alt="' + key + '"]');
        if (!img) return;
        // 檢查是否解鎖
        if (localStorage.getItem(key + '_unlocked') !== 'true') {
            img.src = 'src/' + key + '_locked.png';
            img.classList.add('locked');
            img.style.pointerEvents = 'none';
            img.parentElement.style.cursor = 'not-allowed';
        } else if (localStorage.getItem(key + '_done') === 'true') {
            img.src = 'src/' + key + '_done.png';
            img.classList.add('done');
            img.style.pointerEvents = 'none';
            img.parentElement.style.cursor = 'default';
        } else {
            img.style.pointerEvents = 'auto';
            img.parentElement.style.cursor = 'pointer';
            img.parentElement.onclick = function() {
                window.location.href = key + '.html';
            };
        }
    });
}); 