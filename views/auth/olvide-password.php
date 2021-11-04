<h1 class="nombre-pagina">Recuperar contraseña</h1>
<p class="descripcion-pagina">Reestablece tu contraseña con tu email</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<form class="formulario" method="POST" action="/olvide">
    <div class="campo">
        <label for="email">Email</label>
        <input 
            type ="email"
            id ="email"
            placeholder="Tu Email"
            name="email"
        >
    </div>

    <input type="submit" class="boton" value="Enviar instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta? Inicia sesion</a>
    <a href="/crear-cuenta">¿Aun no tienes cuenta?Crea una</a>
</div>
