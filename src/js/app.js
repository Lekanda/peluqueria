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
    nombreCliente(); // agrega el nombre del cliente a la cita
    seleccionarFecha(); // agrega la fecha a la cita nueva
    seleccionarHora(); // agrega la hora a la cita nueva
    mostrarResumen(); // muestra el resumen de la cita
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
        mostrarResumen();
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

}


function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}



function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e) {
        const dia = new Date(e.target.value).getUTCDay();
        if([6,0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Sabados y Domingos cerrados','error', '.formulario');
        } else {
            cita.fecha = e.target.value;
            const alertaPrevia = document.querySelector('.alerta');
            if(alertaPrevia) {
                alertaPrevia.remove();
            }
        }

        cita.fecha = e.target.value;
    });
}



function mostrarAlerta(mensaje, tipo, elemento,desaparece = true) {
    // Previene que se muestre más de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    //  Crear el DIV de la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta', tipo);
    document.querySelector(elemento).appendChild(alerta);

    // Desaparece: para que la alarma no desaparezca
    if(desaparece) {
        // Eliminar la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e) {
        const  horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        if(hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Horario no disponible','error', '.formulario');
        } else {
            cita.hora = e.target.value;
            const alertaPrevia = document.querySelector('.alerta');
            if(alertaPrevia) {
                alertaPrevia.remove();
            }

        }
    });
}

// Muestra el resumen
function mostrarResumen() {
    // Selecionar el div de resumen
    const resumen = document.querySelector('.contenido-resumen');
    //Limpiar el contenido de resumen 
    while(resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    console.log(cita);
    if(Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Hacen  falta datos o Servicios','error', '.contenido-resumen',false);
        return;
    } 
    // Crear el DIV del resumen
    const { nombre, fecha, hora, servicios } = cita;


    // Heading para servicios en resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    // Iterar y mostrar los servicios
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> €${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    })
    // Heading para cita en resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Cliente: </span>${nombre}`;

    // Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate();
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));
    
    const opciones = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES',opciones);
    



    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha: </span>${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora: </span>${hora} Horas`;

    // Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton', 'boton-reservar');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservaCita;


    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);
}


function reservaCita() {
    
}