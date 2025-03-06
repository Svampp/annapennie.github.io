// Ограничение для частиц
let maxParticles = 500;  // Лимит частиц
let particleInterval = null;
let canvasWidth = 1600;
let canvasHeight = 200;
let pCollection = [];
let pCount = 0;

// Установка изображения дыма
let img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';
let smokeImage = new Image();
smokeImage.src = img;

// Функция для переключения секций
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`nav ul li a[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    if (sectionId === 'skills') {
        document.querySelectorAll('.skill-content').forEach(content => {
            content.classList.remove('active');
        });
    }
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

function handleLinkClick(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    showSection(sectionId);
}

// Обработчики для скилов с удалением старых
document.querySelectorAll('.skill-header').forEach(header => {
    const newHandler = function () {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
    };

    header.replaceWith(header.cloneNode(true));
    header = document.querySelector('.skill-header');
    header.addEventListener('click', newHandler);
});

showSection('info');

// Добавление новых частиц с ограничением
function addNewParticle(delay) {
    if (pCount >= maxParticles) return;

    let p = {
        top: canvasHeight,
        left: randBetween(-200, 800),
        start: new Date().getTime() + delay,
        life: 8000,
        speedUp: 30,
        speedRight: randBetween(0, 20),
        rot: randBetween(-1, 1),
        startOpacity: .05,
        size: 200,
        growth: 10,
        newTop: canvasHeight,
        newLeft: randBetween(-200, 800)
    };

    pCollection.push(p);
    pCount = pCollection.length;
}

// Добавление частиц с интервалом и ограничением
particleInterval = setInterval(() => {
    if (pCount < maxParticles) {
        for (let i = 0; i < 10; i++) {
            addNewParticle(0);
        }
    } else {
        clearInterval(particleInterval);
    }
}, 200);

// Функция анимации дыма
function animateSmoke() {
    draw(new Date().getTime(), 3000);
    requestAnimationFrame(animateSmoke);
}

animateSmoke();

// Функция отрисовки дыма
function draw(startT, totalT) {
    let timeDelta = new Date().getTime() - startT;
    let stillAlive = false;

    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);  // Чистим холст

    for (let i = 0; i < pCollection.length; i++) {
        let p = pCollection[i];
        let td = new Date().getTime() - p.start;
        let frac = td / p.life;

        if (td > 0) {
            if (td <= p.life) {
                stillAlive = true;
            } else {
                pCollection.splice(i, 1);
                pCount--;
                i--;
                continue;
            }

            let newTop = p.top - (p.speedUp * (td / 1000));
            let newLeft = p.left + (p.speedRight * (td / 1000));
            let newOpacity = Math.max(p.startOpacity * (1 - frac), 0);
            let newSize = p.size + (p.growth * (td / 1000));

            p.newTop = newTop;
            p.newLeft = newLeft;

            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }

    if (!stillAlive) {
        pCollection = [];
        pCount = 0;
    }
}

// Вспомогательные функции
function randBetween(n1, n2) {
    return (Math.random() * (n2 - n1)) + n1;
}

function clog(s) {
    console.log(s);
}
