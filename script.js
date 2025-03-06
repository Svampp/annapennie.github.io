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

console.clear();

canvasWidth = 1600;
canvasHeight = 200;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 2000;
var img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0; i1 < puffs; i1++) {
    var puffDelay = i1 * 1500; //300 ms between puffs

    for (var i2 = 0; i2 < particlesPerPuff; i2++) {
        addNewParticle((i2 * 50) + puffDelay);
    }
}


draw(new Date().getTime(), 3000)



function addNewParticle(delay) {

    var p = {};
    p.top = canvasHeight;
    p.left = randBetween(-200, 800);

    p.start = new Date().getTime() + delay;
    p.life = 8000;
    p.speedUp = 30;


    p.speedRight = randBetween(0, 20);

    p.rot = randBetween(-1, 1);
    p.red = Math.floor(randBetween(50, 100));
    p.blue = Math.floor(randBetween(50, 100));
    p.green = Math.floor(randBetween(50, 100));


    p.startOpacity = .15 //прозрачность
    p.newTop = p.top;
    p.newLeft = p.left;
    p.size = 200;
    p.growth = 10;

    pCollection[pCount] = p;
    pCount++;


}

function draw(startT, totalT) {
    //Timing
    var timeDelta = new Date().getTime() - startT;
    var stillAlive = false;

    //Grab and clear the canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = c.width;

    //Loop through particles
    for (var i = 0; i < pCount; i++) {
        //Grab the particle
        var p = pCollection[i];

        //Timing
        var td = new Date().getTime() - p.start;
        var frac = td / p.life

        if (td > 0) {
            if (td <= p.life) { stillAlive = true; }

            //attributes that change over time
            var newTop = p.top - (p.speedUp * (td / 1000));
            var newLeft = p.left + (p.speedRight * (td / 1000));
            var newOpacity = Math.max(p.startOpacity * (1 - frac), 0);

            var newSize = p.size + (p.growth * (td / 1000));
            p.newTop = newTop;
            p.newLeft = newLeft;

            //Draw!
            ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';
            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }



    //Repeat if there's still a living particle
    if (stillAlive) {
        requestAnimationFrame(function () { draw(startT, totalT); });
    }
    else {
        clog(timeDelta + ": stopped");
    }
}

function randBetween(n1, n2) {
    var r = (Math.random() * (n2 - n1)) + n1;
    return r;
}

function randOffset(n, variance) {
    //e.g. variance could be 0.1 to go between 0.9 and 1.1
    var max = 1 + variance;
    var min = 1 - variance;
    var r = Math.random() * (max - min) + min;
    return n * r;
}

function clog(s) {
    console.log(s);
}