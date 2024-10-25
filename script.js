const toggleThemeButton = document.getElementById('toggle-theme');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const img =  document.getElementById('toggle-img');


toggleThemeButton.addEventListener('click', () => {

    if(img.src.includes("sun.png")){
        img.src = "moon.png";
    }else{
        img.src = "sun.png";
    }


    const rootStyles = document.documentElement.style;
    if (rootStyles.getPropertyValue('--background-color') === '#646D8C') {
        rootStyles.setProperty('--background-color', '#1c1c1c');
        rootStyles.setProperty('--text-color', '#f1f1f1');
        rootStyles.setProperty('--nav-bg-color', '#333');
        rootStyles.setProperty('--nav-text-color', '#f1f1f1');
        
    } else {
        rootStyles.setProperty('--background-color', '#646D8C');
        rootStyles.setProperty('--text-color', '#f1f1f1');
        rootStyles.setProperty('--nav-bg-color', '#8B95B0');
        rootStyles.setProperty('--nav-text-color', '#f1f1f1');
        

    }
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slideWidth = slides[0].clientWidth;
    sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

window.onload = function () {
    showSlide(currentSlide);
    window.addEventListener('resize', function () {
        showSlide(currentSlide); 
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');

    telefoneInput.addEventListener('input', function(e) {
        let telefone = e.target.value.replace(/\D/g, '');

        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (telefone.length > 5) {
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else {
            telefone = telefone.replace(/^(\d*)/, '($1');
        }

        e.target.value = telefone;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !telefone || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        alert('Formulário enviado com sucesso!');
        form.reset(); 
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.backgroundColor = '#F0E5FF';
            input.style.transition = 'background-color 0.3s';
        });

        input.addEventListener('blur', () => {
            input.style.backgroundColor = 'white';
        });
    });
});
