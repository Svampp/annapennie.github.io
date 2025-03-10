let maxParticles = 500;  
let particleInterval = null;
let canvasWidth = 1600;
let canvasHeight = 200;
let pCollection = [];
let pCount = 0;

let img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';
let smokeImage = new Image();
smokeImage.src = img;

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

window.onload = function () {
    if (isMobileDevice()) {
        document.getElementById('mobile-message').style.display = 'flex';
    }
};
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

document.querySelectorAll('.skill-header').forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling;
        content.classList.toggle('active');
    });
});

showSection('info');

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
        startOpacity: .02,
        size: 200,
        growth: 10,
        newTop: canvasHeight,
        newLeft: randBetween(-200, 800)
    };

    pCollection.push(p);
    pCount = pCollection.length;
}

particleInterval = setInterval(() => {
    if (pCount < maxParticles) {
        for (let i = 0; i < 10; i++) {
            addNewParticle(0);
        }
    } else {
        clearInterval(particleInterval);
    }
}, 200);

function animateSmoke() {
    draw(new Date().getTime(), 3000);
    requestAnimationFrame(animateSmoke);
}

animateSmoke();

function draw(startT, totalT) {
    let timeDelta = new Date().getTime() - startT;
    let stillAlive = false;

    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height); 

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

            ctx.fillStyle = 'rgba(128, 128, 128,' + newOpacity + ')';
            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }

    if (!stillAlive) {
        pCollection = [];
        pCount = 0;
    }
}

function randBetween(n1, n2) {
    return (Math.random() * (n2 - n1)) + n1;
}

function clog(s) {
    console.log(s);
}
