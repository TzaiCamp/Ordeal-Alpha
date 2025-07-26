document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.querySelector('.content-area');
    const rightArrowBtn = document.getElementById('right-arrow');
    const lines = [
        '請讀第五章。<br><hr>',
        '第五章完結。<br><hr>',
        '第一幕完結。<br><hr>'
    ];
    let currentLine = 0;

    // 初始化只顯示第一行
    contentArea.innerHTML = `<p>${lines[0]}</p>`;

    rightArrowBtn.addEventListener('click', function () {
        currentLine++;
        if (currentLine < lines.length) {
            // 累積顯示
            contentArea.innerHTML = lines.slice(0, currentLine + 1).map(line => `<p>${line}</p>`).join('');
            // 最後一行時換成 home 按鈕
            if (currentLine === lines.length - 1) {
                rightArrowBtn.querySelector('img').src = 'src/home.png';
                rightArrowBtn.querySelector('img').alt = 'Home';
            }
        } else {
            window.location.href = 'main.html';
        }
    });
});
