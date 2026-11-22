
/* =========================================
   SABORES DE COLOMBIA
   GALERÍAS DE PLATOS POR REGIÓN
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galerias = document.querySelectorAll(".galeria-contenedor");

    galerias.forEach(function (galeria) {

        const contenedor = galeria.querySelector(".contenedor-platos");
        const btnAnterior = galeria.querySelector(".btn-anterior");
        const btnSiguiente = galeria.querySelector(".btn-siguiente");

        if (!contenedor) return;

        const platos = Array.from(contenedor.querySelectorAll(".plato"));

        let posicion = 0;

        /* ---------------------------------
           CALCULAR PLATOS VISIBLES
        --------------------------------- */

        function obtenerVisibles() {

            if (window.innerWidth <= 600) {
                return 1;
            }

            if (window.innerWidth <= 900) {
                return 2;
            }

            return 3;
        }

        /* ---------------------------------
           ACTUALIZAR GALERÍA
        --------------------------------- */

        function actualizarGaleria() {

            if (platos.length === 0) return;

            const visibles = obtenerVisibles();

            const maximo = Math.max(0, platos.length - visibles);

            posicion = Math.min(Math.max(posicion, 0), maximo);

            const primerPlato = platos[0];

            const anchoPlato = primerPlato.offsetWidth;

            const estilos = window.getComputedStyle(contenedor);

            const espacio = parseFloat(estilos.columnGap) || 0;

            const desplazamiento = posicion * (anchoPlato + espacio);

            contenedor.style.transform =
                `translateX(-${desplazamiento}px)`;

            /* Botón anterior */

            if (btnAnterior) {

                btnAnterior.style.display =
                    posicion <= 0 ? "none" : "flex";

            }

            /* Botón siguiente */

            if (btnSiguiente) {

                btnSiguiente.style.display =
                    posicion >= maximo ? "none" : "flex";

            }

        }

        /* ---------------------------------
           BOTÓN ANTERIOR
        --------------------------------- */

        if (btnAnterior) {

            btnAnterior.addEventListener("click", function () {

                posicion = Math.max(posicion - 1, 0);

                actualizarGaleria();

            });

        }

        /* ---------------------------------
           BOTÓN SIGUIENTE
        --------------------------------- */

        if (btnSiguiente) {

            btnSiguiente.addEventListener("click", function () {

                const maximo = Math.max(
                    0,
                    platos.length - obtenerVisibles()
                );

                posicion = Math.min(posicion + 1, maximo);

                actualizarGaleria();

            });

        }

        /* ---------------------------------
           ACTUALIZAR AL CAMBIAR DE PANTALLA
        --------------------------------- */

        window.addEventListener("resize", function () {

            actualizarGaleria();

        });

        /* INICIAR */

        actualizarGaleria();

    });

});



/* =========================================
   GALERÍAS DESLIZABLES - REGIONES
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".galeria-contenedor").forEach(galeria => {

        const contenedor = galeria.querySelector(".contenedor-platos");
        const btnAnterior = galeria.querySelector(".btn-anterior");
        const btnSiguiente = galeria.querySelector(".btn-siguiente");

        if (!contenedor || !btnAnterior || !btnSiguiente) return;

        const platos = contenedor.querySelectorAll(".plato");

        if (!platos.length) return;

        let posicion = 0;

        // Calcular cuántas tarjetas se muestran
        function tarjetasVisibles() {

            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;

            return 3;
        }

        // Máximo desplazamiento permitido
        function maximo() {
            return Math.max(0, platos.length - tarjetasVisibles());
        }

        // Mover las tarjetas
        function moverGaleria() {

            posicion = Math.max(0, Math.min(posicion, maximo()));

            const tarjeta = platos[posicion];

            if (!tarjeta) return;

            const desplazamiento = tarjeta.offsetLeft - platos[0].offsetLeft;

            contenedor.style.transform = `translateX(-${desplazamiento}px)`;

            btnAnterior.style.display = posicion === 0 ? "none" : "flex";

            btnSiguiente.style.display = posicion >= maximo() ? "none" : "flex";
        }

        // Botón izquierdo
        btnAnterior.addEventListener("click", () => {

            posicion--;

            moverGaleria();

        });

        // Botón derecho
        btnSiguiente.addEventListener("click", () => {

            posicion++;

            moverGaleria();

        });

        // Ajustar cuando cambia el tamaño de pantalla
        window.addEventListener("resize", moverGaleria);

        // Iniciar
        moverGaleria();

    });

});





/* ==========================================
   CARRUSEL - MAPA GASTRONÓMICO
========================================== */

(function () {

    const paginaMapa = document.querySelector(".pagina-mapa");

    // Si no estamos en la página del mapa, no ejecutamos el carrusel.
    if (!paginaMapa) return;

    const pista = paginaMapa.querySelector(".carrusel-pista");
    const slides = paginaMapa.querySelectorAll(".carrusel-slide");

    const botonAnterior = paginaMapa.querySelector(".flecha-carrusel.anterior");
    const botonSiguiente = paginaMapa.querySelector(".flecha-carrusel.siguiente");

    const indicadores = paginaMapa.querySelectorAll(".indicador");

    if (!pista || slides.length === 0) return;

    let indiceActual = 0;
    const totalSlides = slides.length;


    /* ==========================================
       MOSTRAR IMAGEN
    ========================================== */

    function mostrarSlide(indice) {

        // Evitar que el índice se salga de los límites.
        if (indice < 0) {
            indiceActual = totalSlides - 1;
        } else if (indice >= totalSlides) {
            indiceActual = 0;
        } else {
            indiceActual = indice;
        }

        // Mover el carrusel.
        pista.style.transform = `translateX(-${indiceActual * 100}%)`;

        // Actualizar indicadores.
        indicadores.forEach((indicador, i) => {

            indicador.classList.toggle(
                "activo",
                i === indiceActual
            );

            indicador.setAttribute(
                "aria-current",
                i === indiceActual ? "true" : "false"
            );

        });

        // Actualizar accesibilidad de las diapositivas.
        slides.forEach((slide, i) => {

            slide.setAttribute(
                "aria-hidden",
                i !== indiceActual
            );

        });

    }


    /* ==========================================
       BOTÓN ANTERIOR
    ========================================== */

    if (botonAnterior) {

        botonAnterior.addEventListener("click", function () {

            mostrarSlide(indiceActual - 1);

        });

    }


    /* ==========================================
       BOTÓN SIGUIENTE
    ========================================== */

    if (botonSiguiente) {

        botonSiguiente.addEventListener("click", function () {

            mostrarSlide(indiceActual + 1);

        });

    }


    /* ==========================================
       INDICADORES
    ========================================== */

    indicadores.forEach((indicador, indice) => {

        indicador.addEventListener("click", function () {

            mostrarSlide(indice);

        });

    });


    /* ==========================================
       DESLIZAMIENTO TÁCTIL
    ========================================== */

    let inicioX = 0;
    let finalX = 0;

    const ventanaCarrusel = paginaMapa.querySelector(".carrusel-ventana");

    if (ventanaCarrusel) {

        ventanaCarrusel.addEventListener("touchstart", function (evento) {

            inicioX = evento.changedTouches[0].screenX;

        }, { passive: true });


        ventanaCarrusel.addEventListener("touchend", function (evento) {

            finalX = evento.changedTouches[0].screenX;

            const diferencia = finalX - inicioX;

            // Detectar desplazamiento horizontal.
            if (Math.abs(diferencia) > 50) {

                if (diferencia < 0) {

                    mostrarSlide(indiceActual + 1);

                } else {

                    mostrarSlide(indiceActual - 1);

                }

            }

        }, { passive: true });

    }


    /* ==========================================
       NAVEGACIÓN CON TECLADO
    ========================================== */

    paginaMapa.addEventListener("keydown", function (evento) {

        // Evitar interferir cuando se escribe en campos de texto.
        if (
            evento.target.tagName === "INPUT" ||
            evento.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        if (evento.key === "ArrowRight") {

            mostrarSlide(indiceActual + 1);

        }

        if (evento.key === "ArrowLeft") {

            mostrarSlide(indiceActual - 1);

        }

    });


    /* ==========================================
       INICIAR CARRUSEL
    ========================================== */

    mostrarSlide(0);

})();



/* =========================
   TRADUCTOR DE IDIOMA
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const traducciones = {
        es: {
            marca: "Sabores de Colombia",
            inicio: "Inicio",
            regiones: "Regiones",
            mapa: "Mapa gastronómico"
        },

        en: {
            marca: "Flavors of Colombia",
            inicio: "Home",
            regiones: "Regions",
            mapa: "Gastronomic Map"
        }
    };

    function cambiarIdioma(idioma) {

        const textos = traducciones[idioma];

        if (!textos) return;

        document.querySelectorAll("[data-translate]").forEach(function(elemento) {

            const clave = elemento.getAttribute("data-translate");

            if (textos[clave]) {
                elemento.textContent = textos[clave];
            }

        });

        document.documentElement.lang = idioma;

        localStorage.setItem("idiomaSeleccionado", idioma);

        console.log("Idioma cambiado a:", idioma);
    }

    document.querySelectorAll("[data-lang]").forEach(function(boton) {

        boton.addEventListener("click", function() {

            cambiarIdioma(boton.getAttribute("data-lang"));

        });

    });

    const idiomaGuardado = localStorage.getItem("idiomaSeleccionado") || "es";

    cambiarIdioma(idiomaGuardado);

});

