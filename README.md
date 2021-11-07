# APP Peluqueria

## Informacion para servidor

- Probado con servidor PHP de desarrollo.
- Puerto de servidor **5000**: **php -S 127.0.0.1:5000**
    - **127.0.0.1**: para poder hacer peticiones con Thunder Client

- Base de datos MYSQL(Local).
    - **Nombre DB**: *appsalon_mvc*
    - **Port**: *3306*
    - **IP**: *127.0.0.1*

## Informacion del servicio

- Permite *crear* una cuenta de *usuario*.
    - Crear *cuenta* con **mail de confirmacion**.
    - Posibilidad para *recuperar* cuenta de usuario.
    - Protegido por token.
- Permite crear una cita con datos de servicios , fecha y hora.
    - Interfaz amigable para seleccionar los servicios.
    