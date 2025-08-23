document.addEventListener('DOMContentLoaded', function() {
    const charInputs = [
        document.getElementById('char1'),
        document.getElementById('char2'),
        document.getElementById('char3'),
        document.getElementById('char4')
    ];
    const keys = document.querySelectorAll('.key');
    const clearBtn = document.getElementById('clear-btn');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');
    const errorModal = document.getElementById('error-modal');
    const closeErrorBtn = document.getElementById('close-error');
    const backspaceKey = document.getElementById('backspace-key');
    const prevBtn = document.getElementById('prevBtn');

    // 當前焦點輸入框索引
    let currentInputIndex = 0;

    // Prev 按鈕點擊事件
    prevBtn.addEventListener('click', function() {
        window.location.href = 'task.html';
    });

    // 獲取當前焦點輸入框
    function getCurrentInput() {
        return charInputs[currentInputIndex];
    }

    // 移動到下一個輸入框
    function moveToNextInput() {
        if (currentInputIndex < charInputs.length - 1) {
            currentInputIndex++;
            charInputs[currentInputIndex].focus();
        }
    }

    // 移動到上一個輸入框
    function moveToPrevInput() {
        if (currentInputIndex > 0) {
            currentInputIndex--;
            charInputs[currentInputIndex].focus();
        }
    }

    // 更新輸入框視覺狀態
    function updateInputVisualState() {
        charInputs.forEach((input, index) => {
            if (input.value.trim() !== '') {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    }

    // 禁用實體鍵盤輸入
    charInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            e.preventDefault();
            return false;
        });

        input.addEventListener('keyup', function(e) {
            e.preventDefault();
            return false;
        });

        input.addEventListener('keypress', function(e) {
            e.preventDefault();
            return false;
        });

        // 禁用右鍵選單
        input.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // 禁用複製貼上
        input.addEventListener('copy', function(e) {
            e.preventDefault();
            return false;
        });

        input.addEventListener('paste', function(e) {
            e.preventDefault();
            return false;
        });

        input.addEventListener('cut', function(e) {
            e.preventDefault();
            return false;
        });

        // 點擊輸入框時聚焦並設置當前索引
        input.addEventListener('click', function() {
            currentInputIndex = charInputs.indexOf(this);
            this.focus();
        });
    });

    // 虛擬鍵盤按鍵事件
    keys.forEach(key => {
        key.addEventListener('click', function() {
            let keyValue = this.getAttribute('data-key');
            
            // 跳過backspace按鍵的處理
            if (this.id === 'backspace-key') {
                return;
            }
            
            // 添加按鍵動畫效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            const currentInput = getCurrentInput();
            
            // 處理數字按鍵
            if (keyValue && keyValue.match(/[0-9]/)) {
                // 設置當前輸入框的值
                currentInput.value = keyValue;
                updateInputVisualState();
                
                // 移動到下一個輸入框
                moveToNextInput();
            }

            // 聚焦到當前輸入框
            getCurrentInput().focus();
        });

        // 添加觸控支援
        key.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });

        key.addEventListener('touchend', function(e) {
            e.preventDefault();
            let keyValue = this.getAttribute('data-key');
            
            // 跳過backspace按鍵的處理
            if (this.id === 'backspace-key') {
                return;
            }
            
            const currentInput = getCurrentInput();
            
            // 處理數字按鍵
            if (keyValue && keyValue.match(/[0-9]/)) {
                // 設置當前輸入框的值
                currentInput.value = keyValue;
                updateInputVisualState();
                
                // 移動到下一個輸入框
                moveToNextInput();
            }
            
            getCurrentInput().focus();
        });
    });

    // 清除按鈕
    clearBtn.addEventListener('click', function() {
        charInputs.forEach(input => {
            input.value = '';
        });
        currentInputIndex = 0;
        charInputs[0].focus();
        updateInputVisualState();
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });

    // Backspace 鍵功能
    backspaceKey.addEventListener('click', function() {
        const currentInput = getCurrentInput();
        
        if (currentInput.value !== '') {
            // 如果當前輸入框有值，清除它
            currentInput.value = '';
            updateInputVisualState();
        } else {
            // 如果當前輸入框為空，移動到上一個輸入框並清除
            moveToPrevInput();
            const prevInput = getCurrentInput();
            if (prevInput.value !== '') {
                prevInput.value = '';
                updateInputVisualState();
            }
        }
        
        getCurrentInput().focus();
    });
    
    backspaceKey.addEventListener('touchend', function(e) {
        e.preventDefault();
        const currentInput = getCurrentInput();
        
        if (currentInput.value !== '') {
            // 如果當前輸入框有值，清除它
            currentInput.value = '';
            updateInputVisualState();
        } else {
            // 如果當前輸入框為空，移動到上一個輸入框並清除
            moveToPrevInput();
            const prevInput = getCurrentInput();
            if (prevInput.value !== '') {
                prevInput.value = '';
                updateInputVisualState();
            }
        }
        
        getCurrentInput().focus();
    });

    // 防止頁面滾動（在移動設備上）
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.keyboard-container')) {
            e.preventDefault();
        }
    }, { passive: false });

    // 添加鍵盤音效（可選）
    function playKeySound() {
        // 創建一個簡單的按鍵音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // 為按鍵添加音效（可選，取消註釋即可啟用）
    /*
    keys.forEach(key => {
        key.addEventListener('click', function() {
            playKeySound();
        });
    });
    */

    // 添加視覺反饋
    function addVisualFeedback(element) {
        element.style.backgroundColor = '#667eea';
        element.style.color = 'white';
        setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.color = '';
        }, 150);
    }

    // 為控制按鈕添加視覺反饋
    clearBtn.addEventListener('click', function() {
        addVisualFeedback(this);
    });

    // 提交按鈕事件
    submitBtn.addEventListener('click', function() {
        // 組合所有輸入框的值
        const inputValue = charInputs.map(input => input.value).join('');
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        // 檢查是否完全等於"1234"（不能有多餘空格或字符）
        if (inputValue === '1234') {
            // 答對時寫入 localStorage
            localStorage.setItem('A6Cleared', 'true');
            // 顯示成功提示窗
            successModal.classList.add('show');
        } else {
            // 顯示失敗提示窗
            errorModal.classList.add('show');
        }
        
        // 清除輸入框內容
        charInputs.forEach(input => {
            input.value = '';
        });
        currentInputIndex = 0;
        charInputs[0].focus();
        updateInputVisualState();
    });

    // 關閉成功提示窗
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            localStorage.setItem('A6_done', 'true');
            successModal.classList.remove('show');
            window.location.href = 'task.html';
        });
    }

    // 點擊背景關閉提示窗
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            getCurrentInput().focus();
        }
    });

    // 關閉失敗提示窗
    closeErrorBtn.addEventListener('click', function() {
        errorModal.classList.remove('show');
        getCurrentInput().focus();
    });

    // 點擊背景關閉失敗提示窗
    errorModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            getCurrentInput().focus();
        }
    });

    // 初始化時聚焦到第一個輸入框
    charInputs[0].focus();

    // 防止頁面重新載入時失去焦點
    window.addEventListener('beforeunload', function() {
        charInputs.forEach(input => input.blur());
    });

    // 添加錯誤處理
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // 添加載入完成提示
    console.log('虛擬鍵盤系統已載入完成！');
});
