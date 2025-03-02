document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId); 
        targetSection.scrollIntoView({ behavior: 'smooth' }); 
    });
});
