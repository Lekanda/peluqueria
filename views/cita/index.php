<h1 class="nombre-pagina">Crear Cita</h1>
<p class="descripcion-pagina">Elije tus servicios a continuacion y pon tus datos</p>

<div id="app">

    <nav class="tabs">
        <button class="actual" type="button" dat-paso="1">Servicios</button>
        <button type="button" dat-paso="2">Informacion Cita</button>
        <button type="button" dat-paso="3">Resumen</button>
    </nav>



    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>

    <div id="paso-2" class="seccion">
        <h2>Tus datos y Cita</h2>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>

        <form class="formulario" action="">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value="<?php echo $nombre; ?>"
                    disabled
                />
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input 
                    id="fecha"
                    type="date"
                />
            </div>
            <div class="campo">
                <label for="hora">Hora</label>
                <input 
                    id="hora"
                    type="time"
                />
            </div>
        </form>
    </div>

    <div id="paso-3" class="seccion">
        <h2>Resumen</h2>
        <p class="text-center">Verfica que la informacion sea correcta</p>
    </div>

    <div class="paginacion">
        <button
            id="anterior"
            class="boton"
        >&laquo; Anterior</button>
        <button
            id="siguiente"
            class="boton"
        >Siguiente &raquo;</button>
    </div>
</div>