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
        threshold: 0.2
    });

    targets.forEach(target => {
        observer.observe(target);
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

