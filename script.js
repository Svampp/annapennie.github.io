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

    // Если активен раздел Skills, скрываем весь контент по умолчанию
    if (sectionId === 'skills') {
        document.querySelectorAll('.skill-content').forEach(content => {
            content.classList.remove('active');
        });
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

// Обработчик кликов по заголовкам в Skills
document.querySelectorAll('.skill-header').forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling; // Находим следующий элемент (контент)
        content.classList.toggle('active'); // Переключаем видимость контента
    });
});

// По умолчанию показываем раздел INFO
showSection('info');

document.addEventListener('DOMContentLoaded', () => {
    // Настройки дыма
    const canvas = document.getElementById('smokeCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 200; // Высота области дыма

    const particles = [];
    const particleCount = 100; // Количество частиц дыма
    const smokeImage = new Image();
    smokeImage.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png'; // Изображение дыма

    // Создание частиц дыма
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width, // Начальная позиция по X
                y: canvas.height, // Начальная позиция по Y (нижняя часть)
                size: Math.random() * 100 + 50, // Размер частицы
                speedX: Math.random() * 2 - 1, // Скорость по X
                speedY: Math.random() * -0.5 - 0.5, // Скорость по Y (вверх)
                opacity: Math.random() * 0.5 + 0.2, // Прозрачность
                rotation: Math.random() * 360, // Вращение
                growth: Math.random() * 0.1 + 0.05, // Рост частицы
            });
        }
    }

    // Отрисовка дыма
    function drawSmoke() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка canvas

        particles.forEach((particle, index) => {
            // Обновление позиции и размера
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size += particle.growth;
            particle.opacity -= 0.005; // Постепенное исчезновение

            // Если частица исчезла, заменяем её новой
            if (particle.opacity <= 0) {
                particles[index] = {
                    x: Math.random() * canvas.width,
                    y: canvas.height,
                    size: Math.random() * 100 + 50,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * -0.5 - 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    rotation: Math.random() * 360,
                    growth: Math.random() * 0.1 + 0.05,
                };
            }

            // Отрисовка частицы
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.translate(particle.x, particle.y);
            ctx.rotate((particle.rotation * Math.PI) / 180);
            ctx.drawImage(
                smokeImage,
                -particle.size / 2,
                -particle.size / 2,
                particle.size,
                particle.size
            );
            ctx.restore();
        });

        requestAnimationFrame(drawSmoke); // Бесконечная анимация
    }

    // Запуск эффекта дыма
    createParticles();
    drawSmoke();

    // Обновление размера canvas при изменении размера окна
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
    });
});