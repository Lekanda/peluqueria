let paso = 1;
let paso2 = 0;
let paso3 = 0;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    
    tabs();//Cambia la seccion en /cita cuando presionas los tabs

}

function mostrarSeccion() {
    console.log('Mostrando seccion');
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
