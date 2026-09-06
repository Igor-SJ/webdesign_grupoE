document.addEventListener("DOMContentLoaded", () => {

    /*
     * ==========================================================
     * MENU MOBILE
     * ==========================================================
     */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /*
     * ==========================================================
     * ANIMAÇÃO DOS NÚMEROS
     * ==========================================================
     */

    const counters = document.querySelectorAll("[data-count]");

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;

                const target = Number(
                    element.dataset.count
                );

                const duration = 1200;

                const start = performance.now();

                function updateNumber(currentTime) {

                    const elapsed =
                        currentTime - start;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    /*
                     * Ease-out:
                     * começa rápido e desacelera
                     * suavemente perto do valor final.
                     */

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    const current =
                        Math.round(target * eased);

                    element.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(
                            updateNumber
                        );
                    } else {
                        element.textContent = target;
                    }

                }

                requestAnimationFrame(updateNumber);

                observerInstance.unobserve(element);

            });

        },
        {
            threshold: 0.55
        }
    );


    counters.forEach((counter) => {
        observer.observe(counter);
    });


    /*
     * ==========================================================
     * SIMULAÇÃO CONCEITUAL
     * ==========================================================
     */

    const simulateButton =
        document.getElementById("simulateButton");

    const simulation =
        document.querySelector(".simulation");


    function runSimulation() {

        simulation.classList.remove("playing");

        /*
         * Força o navegador a recalcular o estado
         * para que a animação possa ser repetida.
         */

        void simulation.offsetWidth;

        simulation.classList.add("playing");

        simulateButton.textContent = "Ciclo em execução…";

        setTimeout(() => {

            simulateButton.textContent =
                "Executar ciclo novamente";

        }, 700);

    }


    simulateButton.addEventListener(
        "click",
        runSimulation
    );


    /*
     * ==========================================================
     * EFEITO DE REVELAÇÃO AO ROLAR
     * ==========================================================
     */

    const revealElements = document.querySelectorAll(
        ".process-step, .feature-card, .source-card, .physics-point"
    );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observerInstance.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

});