// Функция для переключения разделов
function showSection(sectionId) {
    // Скрываем все разделы
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Показываем выбранный раздел
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // Убираем активный класс у всех кнопок
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });

    // Добавляем активный класс к выбранной кнопке
    const activeLink = document.querySelector(`nav ul li a[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Обработчик кликов по кнопкам навигации
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Отменяем стандартное поведение ссылки
        const sectionId = this.getAttribute('data-section'); // Получаем ID раздела
        showSection(sectionId); // Показываем выбранный раздел
    });
});

// По умолчанию показываем раздел INFO
showSection('info');
