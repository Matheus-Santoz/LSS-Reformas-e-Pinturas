document.addEventListener('DOMContentLoaded', () => {

    //aleatoridade do número de contato
    const DISTRIBUTION_THRESHOLD = 70;
    const MAIN_NUMBER_URL = 'https://wa.me/5513988725645'; // O número principal (70%)
    const SECONDARY_NUMBER_URL = 'https://wa.me/5511954782603'; // O outro número (30%)

    const whatsappLinks = document.querySelectorAll('.whatsapp-split-link-class');

    if (whatsappLinks.length > 0) {

        const randomNumber = Math.floor(Math.random() * 100) + 1;

        const finalUrl = (randomNumber <= DISTRIBUTION_THRESHOLD)
            ? MAIN_NUMBER_URL
            : SECONDARY_NUMBER_URL;

        whatsappLinks.forEach(link => {
            link.setAttribute('href', finalUrl);
        });

        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'whatsapp_split_loaded',
                'whatsapp_group': (randomNumber <= DISTRIBUTION_THRESHOLD) ? 'Group_70_Main' : 'Group_30_Secondary'
            });
        }
    }

    //transição de fade para elementos à vista na tela
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

    //comportamento do menu mobile
    const upperHeader = document.querySelector('.upper-header');
    const nav = document.querySelector('nav');
    const menuButton = document.getElementById('menu-clickable');
    const closeButton = document.getElementById('exit-menu');
    const menuContainer = document.getElementById('menu-collapse');
    const body = document.body;

    if (menuButton && closeButton && menuContainer) {

        const openMenu = () => {
            menuContainer.classList.add('menu-ativo');
        };

        const closeMenu = () => {
            menuContainer.classList.remove('menu-ativo');
        };

        menuButton.addEventListener('click', openMenu);
        closeButton.addEventListener('click', closeMenu);
    }

    let lastScrollY = window.scrollY;

    //impede o scroll no viewport mobile caso o menu esteja aberto (quebrado)
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

    const todosOsCarrosseis = document.querySelectorAll('.portfolio-item');

    todosOsCarrosseis.forEach(carrossel => {

        const wrapper = carrossel.querySelector('.card-portfolio-wrapper');
        const btnLeft = carrossel.querySelector('.carousel-btn.left');
        const btnRight = carrossel.querySelector('.carousel-btn.right');

        const scrollAmount = 320;

        btnLeft.addEventListener('click', () => {
            wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        const galeriaContainer = carrossel.querySelector('.galeria-imagens');

        if (galeriaContainer) {

            lightGallery(galeriaContainer, {
                plugins: [lgFullscreen],
                speed: 500,
                download: false,
                selector: '.link-gallery'
            });
        }

    });


});



