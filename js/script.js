'use sctrict'

// -----------------------------------------------------------------------------------
// variables
const btnCloseWindow = document.querySelector('.modal__close');
const btnShowWindow = document.querySelector('.play__button');

const modalWindow = document.querySelector('.about__modal-window');
const imgDog1 = document.querySelector('.hero__animated-img1');
const imgDog2 = document.querySelector('.hero__animated-img2');
const imgDog3 = document.querySelector('.hero__animated-img3');
const imgDog4 = document.querySelector('.hero__animated-img4');

const headerNavigation = document.querySelector('.menu__menu');
const footerNavigation = document.querySelector('.footer__links-links');
const menu = document.querySelector('.header');

const sectionHero = document.querySelector('.main__section-hero');

const sections = document.querySelectorAll('.section');

const lazyImages = document.querySelectorAll('img[data-src]');
// ----------------------------------------------------------------------------------
btnShowWindow.addEventListener('click', function () {
    modalWindow.classList.remove('hidden');
});
btnCloseWindow.addEventListener('click', function () {
    modalWindow.classList.add('hidden');
});

// ----------------------------------------------------------------------------------
// Change portraits of dogs
const changeDogsPortraitsFunction =  function (num1, num2, num3, num4, time) {
    setInterval(function(){
    imgDog1.style.opacity =100;
    imgDog1.src = `images/decor/decor-elipse-dog0${num1}.png`; 
    imgDog2.src = `images/decor/decor-elipse-dog0${num2}.png`;
    imgDog3.src = `images/decor/decor-elipse-dog0${num3}.png`;
    imgDog4.src = `images/decor/decor-elipse-dog0${num4}.png`;
}, time);
}
changeDogsPortraitsFunction(4, 3, 2, 1, 5000);
changeDogsPortraitsFunction(2, 4, 1, 3, 10000);
changeDogsPortraitsFunction(1, 2, 3, 4, 15000);


// -----------------------------------------------------------------------------------
// Smooth scroll
const scroll = function (button, className){
    button.addEventListener('click', function(e){
        e.preventDefault();
        setTimeout(function() {
            if(e.target.classList.contains(className)) {
                const href = e.target.getAttribute('href');
                document.querySelector(href).scrollIntoView({behavior:'smooth'});
            }
        }, 500);  
    })    
}

scroll(headerNavigation, 'menu__link'); 
scroll(footerNavigation, 'footer__link-link'); 

// -----------------------------------------------------------------------------------
// Sticky navigation menu
const menuHeight = menu.getBoundingClientRect().height;

const stickyMenu = function (entries) {
    const entry = entries[0];
    
    if (!entry.isIntersecting){
        menu.classList.add('sticky');
    } else {
        menu.classList.remove('sticky');
    }
}
const heroSectionObserver = new IntersectionObserver(stickyMenu, {
    root: null,
    threshold: 0,
    rootMargin: `-${menuHeight}px`,
});
heroSectionObserver.observe(sectionHero);

// ----------------------------------------------------------------------------------- 
// Sections appearance
const sectionAppearance = function (entries, observer) {

    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
}
const sectionsObserver = new IntersectionObserver(sectionAppearance, {
    root: null,
    threshold: 0.1,
});
sections.forEach(function(section){
    sectionsObserver.observe(section);
    section.classList.add('section-hidden');
});

// ----------------------------------------------------------------------------------- 
// Lazy loading images
const lazyLoading = function(entries, observer) {

    entries.forEach(elem => {
        if(!elem.isIntersecting) return;

        elem.target.src = elem.target.dataset.src;

        elem.target.addEventListener('load', function() {
            elem.target.classList.remove('lazy-image');
        });   
        observer.unobserve(elem.target);   
    });      
}

const lazyLoadingObserver = new IntersectionObserver(lazyLoading, {
    root: null,
    threshold: 0.5,
});
lazyImages.forEach(image => lazyLoadingObserver.observe(image));

// ----------------------------------------------------------------------------------- 


