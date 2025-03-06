function showSection(sectionId) {
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.removeEventListener('click', handleLinkClick);
        link.addEventListener('click', handleLinkClick);
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
    link.addEventListener('click', function (e) {
        e.preventDefault(); 
        const sectionId = this.getAttribute('data-section'); 
        showSection(sectionId); 
    });
});

document.querySelectorAll('.skill-header').forEach(header => {
    header.addEventListener('click', function () {
        const content = this.nextElementSibling; 
        content.classList.toggle('active'); 
    });
});

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
    var puffDelay = i1 * 1500; 

    for (var i2 = 0; i2 < particlesPerPuff; i2++) {
        addNewParticle((i2 * 50) + puffDelay);
    }
}


setInterval(() => {
    draw(new Date().getTime(), 3000);
}, 100);  

function addNewParticle(delay) {

    var p = {};
    p.top = canvasHeight;
    p.left = randBetween(-200, 800);

    p.start = new Date().getTime() + delay;
    p.life = 8000;
    p.speedUp = 30;


    p.speedRight = randBetween(0, 20);

    p.rot = randBetween(-1, 1);
    p.red = Math.floor(randBetween(20, 50));
    p.blue = Math.floor(randBetween(20, 50));
    p.green = Math.floor(randBetween(20, 500));


    p.startOpacity = .05
    p.newTop = p.top;
    p.newLeft = p.left;
    p.size = 200;
    p.growth = 10;

    pCollection[pCount] = p;
    pCount++;


}

function draw(startT, totalT) {
    
    var timeDelta = new Date().getTime() - startT;
    var stillAlive = false;

  
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = c.width;

   
    for (var i = 0; i < pCount; i++) {
        
        var p = pCollection[i];

        
        var td = new Date().getTime() - p.start;
        var frac = td / p.life

        if (td > 0) {
            if (td <= p.life) { stillAlive = true; }
            else {
                pCollection.splice(i, 1);
                pCount--;
                i--; 
                continue; 
            }

           
            var newTop = p.top - (p.speedUp * (td / 1000));
            var newLeft = p.left + (p.speedRight * (td / 1000));
            var newOpacity = Math.max(p.startOpacity * (1 - frac), 0);

            var newSize = p.size + (p.growth * (td / 1000));
            p.newTop = newTop;
            p.newLeft = newLeft;

            
            ctx.fillStyle = 'rgba(20,20,20,' + newOpacity + ')';
            ctx.globalAlpha = newOpacity;
            ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
        }
    }



   
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
    
    var max = 1 + variance;
    var min = 1 - variance;
    var r = Math.random() * (max - min) + min;
    return n * r;
}

function clog(s) {
    console.log(s);
}
