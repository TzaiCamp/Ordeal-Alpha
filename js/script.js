// 原本的接受鍵
const acceptBtn = document.getElementById('acceptBtn');
acceptBtn.addEventListener('click', function() {
    // 創建黑屏覆蓋層
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #525150;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    
    // 創建加載中文字
    const loadingText = document.createElement('div');
    loadingText.textContent = 'loading...';
    loadingText.style.cssText = `
        color: #fff;
        margin-bottom: 30px;
        font-family: "Silkscreen", sans-serif;
        font-size: 40px;
        font-weight: 400;
        font-style: normal;
    `;
    
    // 創建進度條容器
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 300px;
        height: 20px;
        background: #333;
        overflow: hidden;
        position: relative;
        border: 2px solid #666;
        padding: 2px;
        display: flex;
        align-items: center;
        gap: 2px;
    `;
    
    // 創建方塊進度條
    const totalBlocks = 20; // 總共20個方塊
    const blocks = [];
    
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement('div');
        block.style.cssText = `
            width: 14px;
            height: 14px;
            background: #333;
            border-radius: 2px;
            transition: background 0.2s ease;
        `;
        progressContainer.appendChild(block);
        blocks.push(block);
    }
    
    // 創建進度條
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 100%;
        background: #fff;
        width: 0%;
        transition: width 0.1s ease-out;
        border-radius: 10px;
    `;
    
    progressContainer.appendChild(progressBar);
    blackScreen.appendChild(loadingText);
    blackScreen.appendChild(progressContainer);
    document.body.appendChild(blackScreen);
    
    // 淡入黑屏
    setTimeout(() => {
        blackScreen.style.opacity = '1';
        
        // 開始方塊進度動畫
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // 隨機增加 5-20%
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // 先隱藏加載中文字與進度條
                loadingText.style.display = 'none';
                progressContainer.style.display = 'none';
                
                // 進度完成後顯示傳送門動畫
                const portal = document.createElement('div');
                portal.className = 'portal-effect';
                Object.assign(portal.style, {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '60%',
                    height: '60%',
                    transform: 'translate(-50%, -50%) scale(0.5)',
                    opacity: '0',
                    zIndex: '10000',
                    transition: 'opacity 0.3s, transform 0.5s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                });
                
                // 創建圖片元素
                const portalImg = document.createElement('img');
                portalImg.src = 'src/door.png';
                portalImg.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                `;
                portal.appendChild(portalImg);
                document.body.appendChild(portal);
                setTimeout(() => {
                    portal.style.opacity = '1';
                    portal.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 10);
                
                // 添加警告塗層
                const warningOverlay = document.createElement('div');
                warningOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url('src/warning.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    z-index: 10001;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(warningOverlay);
                
                // 閃爍動畫
                let flashCount = 0;
                const maxFlashes = 6; // 3秒內閃爍6次（每0.5秒一次）
                const flashInterval = setInterval(() => {
                    if (flashCount < maxFlashes) {
                        warningOverlay.style.opacity = warningOverlay.style.opacity === '1' ? '0' : '1';
                        flashCount++;
                    } else {
                        clearInterval(flashInterval);
                        warningOverlay.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(warningOverlay);
                        }, 300);
                    }
                }, 500);
                
                // 點擊傳送門才跳轉
                portal.addEventListener('click', () => {
                    portal.style.opacity = '0';
                    portal.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    setTimeout(() => {
                        window.location.href = 'prev.html';
                    }, 400);
                });
            }
            
            // 計算應該亮起的方塊數量
            const activeBlocks = Math.floor((progress / 100) * totalBlocks);
            
            // 更新方塊顏色
            blocks.forEach((block, index) => {
                if (index < activeBlocks) {
                    block.style.background = '#4CAF50';
                } else {
                    block.style.background = '#333';
                }
            });
        }, 200);
    }, 10);
});

// 隱藏的接受鍵
const sneakyAcceptBtn = document.getElementById('sneakyAcceptBtn');
sneakyAcceptBtn.addEventListener('click', function() {
    // 創建黑屏覆蓋層
    const blackScreen = document.createElement('div');
    blackScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #525150;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    
    // 創建加載中文字
    const loadingText = document.createElement('div');
    loadingText.textContent = 'loading...';
    loadingText.style.cssText = `
        color: #fff;
        margin-bottom: 30px;
        font-family: "Silkscreen", sans-serif;
        font-size: 40px;
        font-weight: 400;
        font-style: normal;
    `;
    
    // 創建進度條容器
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 300px;
        height: 20px;
        background: #333;
        overflow: hidden;
        position: relative;
        border: 2px solid #666;
        padding: 2px;
        display: flex;
        align-items: center;
        gap: 2px;
    `;
    
    // 創建方塊進度條
    const totalBlocks = 20; // 總共20個方塊
    const blocks = [];
    
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement('div');
        block.style.cssText = `
            width: 14px;
            height: 14px;
            background: #333;
            border-radius: 2px;
            transition: background 0.2s ease;
        `;
        progressContainer.appendChild(block);
        blocks.push(block);
    }
    
    // 創建進度條
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 100%;
        background: #fff;
        width: 0%;
        transition: width 0.1s ease-out;
        border-radius: 10px;
    `;
    
    progressContainer.appendChild(progressBar);
    blackScreen.appendChild(loadingText);
    blackScreen.appendChild(progressContainer);
    document.body.appendChild(blackScreen);
    
    // 淡入黑屏
    setTimeout(() => {
        blackScreen.style.opacity = '1';
        
        // 開始方塊進度動畫
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5; // 隨機增加 5-20%
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // 先隱藏加載中文字與進度條
                loadingText.style.display = 'none';
                progressContainer.style.display = 'none';
                
                // 進度完成後顯示傳送門動畫
                const portal = document.createElement('div');
                portal.className = 'portal-effect';
                Object.assign(portal.style, {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    width: '60%',
                    height: '60%',
                    transform: 'translate(-50%, -50%) scale(0.5)',
                    opacity: '0',
                    zIndex: '10000',
                    transition: 'opacity 0.3s, transform 0.5s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                });
                
                // 創建圖片元素
                const portalImg = document.createElement('img');
                portalImg.src = 'src/door.png';
                portalImg.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                `;
                portal.appendChild(portalImg);
                document.body.appendChild(portal);
                setTimeout(() => {
                    portal.style.opacity = '1';
                    portal.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 10);
                
                // 添加警告塗層
                const warningOverlay = document.createElement('div');
                warningOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-image: url('src/warning.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    z-index: 10001;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(warningOverlay);
                
                // 閃爍動畫
                let flashCount = 0;
                const maxFlashes = 6; // 3秒內閃爍6次（每0.5秒一次）
                const flashInterval = setInterval(() => {
                    if (flashCount < maxFlashes) {
                        warningOverlay.style.opacity = warningOverlay.style.opacity === '1' ? '0' : '1';
                        flashCount++;
                    } else {
                        clearInterval(flashInterval);
                        warningOverlay.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(warningOverlay);
                        }, 300);
                    }
                }, 500);
                
                // 點擊傳送門才跳轉
                portal.addEventListener('click', () => {
                    portal.style.opacity = '0';
                    portal.style.transform = 'translate(-50%, -50%) scale(1.3)';
                    setTimeout(() => {
                        window.location.href = 'prev.html';
                    }, 400);
                });
            }
            
            // 計算應該亮起的方塊數量
            const activeBlocks = Math.floor((progress / 100) * totalBlocks);
            
            // 更新方塊顏色
            blocks.forEach((block, index) => {
                if (index < activeBlocks) {
                    block.style.background = '#4CAF50';
                } else {
                    block.style.background = '#333';
                }
            });
        }, 200);
    }, 10);
});

const declineBtn = document.getElementById('declineBtn');
const sneakyAcceptWrapper = document.getElementById('sneakyAcceptWrapper');

declineBtn.addEventListener('click', function(e) {
    declineBtn.classList.add('falling');
    declineBtn.disabled = true;
    setTimeout(() => {
        declineBtn.style.display = 'none';
        sneakyAcceptWrapper.classList.add('show');
        sneakyAcceptWrapper.style.display = 'block';
        setTimeout(() => {
            sneakyAcceptWrapper.style.opacity = '1';
        }, 10);
    }, 800);
}); 