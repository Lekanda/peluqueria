let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}


document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    mostrarSeccion();
    tabs();//Cambia la seccion en /cita cuando presionas los tabs
    botonesPaginador(); // agrega o quita los botones del paginador
    paginaSiguiente(); // Botones para pasar pagina siguiente
    paginaAnterior(); // Botones para pasar pagina anterior
    consultarAPI(); // consulta la api en el backend de PHP
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
    seccion.classList.add('mostrar');

    // Ocultar el tab que tenga la clase actual.
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    // cambiar el tab activo
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');

}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // dataset enlaza con data-paso en cita/index.php
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();
        });
    });
}

function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');
    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaSiguiente.classList.add('ocultar');
        paginaAnterior.classList.remove('ocultar');
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(e) {
        if (paso < pasoInicial) {
            paso = pasoInicial;
        } else {
            paso--;
        }
        mostrarSeccion();
        botonesPaginador(); // oculta los botones de paginador
    });
}


function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(e) {
        if (paso > pasoFinal) {
            paso = pasoFinal;
        } else {
            paso++;
        }
        mostrarSeccion();
        botonesPaginador();
    });
}

// Consultar API
async function consultarAPI() {
    try {
        const url = 'http://localhost:5000/api/servicios';
        const resultado = await fetch(url);
        // convierte el resultado en un json
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio} = servicio;
        
        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        // agregar el servicio al DOM
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}


function seleccionarServicio(servicio) {
    // servicio seleccionado con click
    const { id } = servicio;
    // coger de  cita los servicios (array con datos de nueva cita)
    const { servicios } = cita;

    // Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio = "${id}"]`);

    // Comprueba si el servicio ya esta seleccionado en el array de servicios agregados
    if (servicios.some((agregado) => agregado.id === id)) {
        // Eliminarlos del array de servicios agregados
        cita.servicios = servicios.filter((agregado) => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregar el servicio al array de servicios agregados
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }

    console.log(cita);
}
