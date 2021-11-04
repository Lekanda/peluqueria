<h1 class="nombre-pagina">Recuperar contraseña</h1>
<p class="descripcion-pagina">Introduce tu nueva contraseña</p>

<?php include_once __DIR__ . '/../templates/alertas.php'; ?>

<?php if($error) return; ?>

<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Nueva contraseña</label>
        <input 
            type ="password"
            id ="password"
            placeholder="Tu contraseña nueva"
            name="password"
        >
    </div>

    <input type="submit" class="boton" value="Enviar contraseña nueva">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes cuenta? Inicia sesion</a>
    <a href="/crear-cuenta">¿Aun no tienes cuenta?Crea una</a>
</div>