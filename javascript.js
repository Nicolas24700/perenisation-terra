document.addEventListener("DOMContentLoaded", function () {
    // Menu mobile
    var navToggle = document.querySelector(".navbar-toggle");
    var navMenu = document.querySelector(".navbar-menu");

    function openMenu() {
        if (!navToggle || !navMenu) {
            return;
        }

        navToggle.setAttribute("aria-expanded", "true");
        navMenu.classList.add("open");
    }

    function closeMenu() {
        if (!navToggle || !navMenu) {
            return;
        }

        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
    }

    function toggleMenu() {
        if (!navToggle || !navMenu) {
            return;
        }

        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            toggleMenu();
        });

        var links = navMenu.querySelectorAll("a");

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                closeMenu();
            });
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                closeMenu();
                navToggle.focus();
            }
        });
    }

    // Ombre sur la barre du haut quand on descend
    var navbar = document.querySelector(".navbar");

    function updateNavbarShadow() {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbarShadow, { passive: true });
    updateNavbarShadow();

    // Surligner le lien de navigation actif
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".navbar-menu a");

    function updateActiveLink() {
        var scrollPos = window.scrollY + 120;

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                for (var j = 0; j < navLinks.length; j++) {
                    navLinks[j].classList.remove("active");

                    if (navLinks[j].getAttribute("href") === "#" + id) {
                        navLinks[j].classList.add("active");
                    }
                }
            }
        }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();

    // Animation des éléments quand ils arrivent à l'écran
    var animatedElements = document.querySelectorAll(
        ".card, .resource-card, .step, .testimonial, .variante-card, .video-wrapper, .fiche-meta-item, .audio-item"
    );

    for (var k = 0; k < animatedElements.length; k++) {
        animatedElements[k].classList.add("animate-in");
    }

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            for (var l = 0; l < entries.length; l++) {
                if (entries[l].isIntersecting) {
                    entries[l].target.classList.add("visible");
                    observer.unobserve(entries[l].target);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        for (var m = 0; m < animatedElements.length; m++) {
            observer.observe(animatedElements[m]);
        }
    } else {
        // Si le navigateur ne gère pas l'observer, on affiche tout directement
        for (var n = 0; n < animatedElements.length; n++) {
            animatedElements[n].classList.add("visible");
        }
    }
});