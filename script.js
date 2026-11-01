// Выбор кнопок
document.querySelectorAll('.options button, .mood-scale button').forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.closest('.question-card');
        parent.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Отправка ответов
document.getElementById('submitBtn').addEventListener('click', function() {
    const answers = {
        timestamp: new Date().toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        q1: getAnswer(1),
        q2: getAnswer(2),
        q3: document.getElementById('q3-text').value.trim() || '—',
        q4: document.getElementById('q4-text').value.trim() || '—',
        q5: getAnswer(5),
        q6: document.getElementById('q6-text').value.trim() || '—'
    };

    // Сохраняем в localStorage (массив всех ответов)
    let all = JSON.parse(localStorage.getItem('eliaAnswers') || '[]');
    all.unshift(answers); // новые сверху
    if (all.length > 30) all = all.slice(0, 30); // максимум 30 записей
    localStorage.setItem('eliaAnswers', JSON.stringify(all));

    // Показать тост
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);

    // Немного анимации кнопки
    this.textContent = 'Отправлено 💕';
    this.style.background = 'linear-gradient(135deg, #7ed6a0, #55c57a)';
    setTimeout(() => {
        this.textContent = 'Отправить ответы 💌';
        this.style.background = '';
    }, 2500);
});

function getAnswer(num) {
    const card = document.querySelector(`.question-card[data-q="${num}"]`);
    const selected = card.querySelector('button.selected');
    const text = card.querySelector('textarea');
    
    let result = selected ? selected.dataset.value : '';
    if (text && text.value.trim()) {
        result = result ? result + ' | ' + text.value.trim() : text.value.trim();
    }
    return result || '—';
}
