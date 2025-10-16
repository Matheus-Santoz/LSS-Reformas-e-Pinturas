//transição de fade para elementos à vista na tela
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    targets.forEach(target => {
        observer.observe(target);
    });

    const upperHeader = document.querySelector('.upper-header');
    const nav = document.querySelector('nav');
    const menuButton = document.getElementById('menu-clickable');
    const closeButton = document.getElementById('exit-menu');
    const shadow = document.getElementById('shadow-menu');
    const menuContainer = document.getElementById('menu-collapse');
    const body = document.body;

    if (menuButton && closeButton && shadow && menuContainer) {

        const openMenu = () => {
            menuContainer.classList.add('menu-ativo');
            body.classList.add('no-scroll');
        };

        const closeMenu = () => {
            menuContainer.classList.remove('menu-ativo');
            body.classList.remove('no-scroll');
        };

        menuButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
        shadow.addEventListener('click', closeMenu);
    }

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {

        if (window.innerWidth <= 768) {
            return;
        }

        if (body.classList.contains('no-scroll')) {
            return;
        }

        const currentScrollY = window.scrollY;


        if (currentScrollY > lastScrollY && currentScrollY > 105) {
            if (upperHeader) upperHeader.style.transform = 'translateY(-25px)';
            if (nav) nav.style.transform = 'translateY(-25px)';
        } else if (currentScrollY < lastScrollY && currentScrollY == 0) {
            if (upperHeader) upperHeader.style.transform = 'translateY(0)';
            if (nav) nav.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

});

// o código abaixo controla a exibição do menu lateral e o comportamento de rolagem da página 
const btnMenu = document.getElementById("menu-clickable");
const btnCloseMenu = document.getElementById("exit-menu");
const menuContent = document.getElementById("menu-collapse");
const containerScroll = document.getElementById("body");
const shadowMenu = document.getElementById("shadow-menu");

btnMenu.addEventListener("click", () => {
    menuContent.classList.add("menu-ativo");
    shadowMenu.classList.add("menu-ativo");
    containerScroll.classList.add("no-scroll");
});

btnCloseMenu.addEventListener("click", () => {
    menuContent.classList.remove("menu-ativo");
    shadowMenu.classList.remove("menu-ativo");
    containerScroll.classList.remove("no-scroll");
});

shadowMenu.addEventListener("click", () => {
    menuContent.classList.remove("menu-ativo");
    shadowMenu.classList.remove("menu-ativo");
    containerScroll.classList.remove("no-scroll");
});

