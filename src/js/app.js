let paso = 1;


document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    
    tabs();//Cambia la seccion en /cita cuando presionas los tabs

}

function mostrarSeccion() {
    // Ocultar la seccion que tenga la clase de mostrar.
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }

    // seleccionar la seccion con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    console.log(seccion);
    seccion.classList.add('mostrar');

    

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // dataset enlaza con data-paso en cita/index.php
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
        });
    });

    console.log(botones);
}
