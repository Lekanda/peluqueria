### Consulta SQL para traer todos los datos de la DB

```sql
        SELECT * FROM citas 
        LEFT OUTER JOIN usuarios 
        ON  citas.usuarioId=usuarios.id 
        LEFT OUTER JOIN citasservicios 
        ON citasservicios.citaId=citas.id
        LEFT OUTER JOIN servicios
        ON servicios.id=citasservicios.servicioId;
```