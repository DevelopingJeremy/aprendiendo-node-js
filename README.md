# aprendiendo-node-js

## Usando npm

Con NPM (Node Package Manager) podemos hacer dos cosas
1. Instalar archivos o dependencias
2. Usar la linea de comandos y administrar paquetes y configurar nuestro proyecto

Si usamos

```bash
npm init
```

Nos va a servir para configurar cosas de nuestro proyecto y crear asi sus metadatos por asi decirlo

En las dependencias el ^ instala todas las versiones siguientes a partir del . que tiene.
Ejemplo:

```json
    "dependencies": {
        "picocolors": "^1.1.1"
    }
```

Instala 1.0.1, 1.1.1 y asi, pero no puede subir a 2.0.0

Qué significa cada número

- MAJOR (mayor)

Se incrementa cuando hacés cambios incompatibles que rompen la compatibilidad con versiones anteriores.

Ejemplo: eliminar funciones existentes o cambiar su comportamiento.


```
1.0.0 → 2.0.0
```

- MINOR (menor)

Se incrementa cuando agregás nuevas funcionalidades sin romper lo que ya existe.

Ejemplo: añadir un nuevo método a una librería existente.

```
1.2.0 → 1.3.0
```

- PATCH (parche)

Se incrementa cuando corregís errores sin cambiar la API.

Ejemplo: arreglar un bug.

```
1.2.0 → 1.2.1
```