document.addEventListener('DOMContentLoaded', function() {
    const cipher = 'cefce07c371eee2bdf32f13b2001d36799d0b61e1e5cf5d10ae0600b282b734c';
    const noteBoxes = document.querySelectorAll('.note-box');
    const keys = document.querySelectorAll('.key');
    const backspaceKey = document.querySelector('.backspace-btn');
    const clearBtn = document.getElementById('clear-btn');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');
    const errorModal = document.getElementById('error-modal');
    const closeErrorBtn = document.getElementById('close-error');
    const prevBtn = document.getElementById('prevBtn');

    prevBtn.addEventListener('click', function() {
        window.location.href = 'task.html';
    });

    let notes = [];

    function updateNoteBoxes() {
        noteBoxes.forEach((box, i) => {
            if (notes[i]) {
                box.textContent = notes[i];
                box.classList.add('filled');
            } else {
                box.textContent = '';
                box.classList.remove('filled');
            }
        });
    }

    keys.forEach(key => {
        if (key.classList.contains('backspace-btn')) return;
        key.addEventListener('click', function() {
            if (notes.length >= 5) return;
            const note = this.getAttribute('data-key');
            notes.push(note);
            updateNoteBoxes();
            this.classList.add('pressed');
            setTimeout(() => this.classList.remove('pressed'), 120);
        });
    });

    if (backspaceKey) {
        backspaceKey.addEventListener('click', function() {
            notes.pop();
            updateNoteBoxes();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            notes = [];
            updateNoteBoxes();
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const answer = notes.join(' ');
            const answerEncrypt = superMagic(answer);
            if (answerEncrypt === cipher) { // 範例答案
                successModal.classList.add('show');
            } else {
                errorModal.classList.add('show');
            }
            notes = [];
            updateNoteBoxes();
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            localStorage.setItem('A3_done', 'true');
            successModal.classList.remove('show');
            window.location.href = 'task.html';
        });
    }
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', function() {
            errorModal.classList.remove('show');
        });
    }

    // 初始化
    updateNoteBoxes();
});
