
# REACT APP FERREMAS

## Tabla de Contenidos:

- [Prerrequisitos](#uno)
    - [Node.js](#dos)
    - [Docker](#tres)
- [Instrucciones de uso](#cuatro)
    - [Levantar API con Docker](#cinco)
    - [Levantar REACT APP con Docker](#seis)
    - [Consumir API](#siete)

<a id="uno"></a>
## Prerrequisitos:
Para poder levantar esta APP es necesario cumplir con los prerrequisitos para proceder a instalar las dependencias y correr el código fuente.
<a id="dos"></a>
### 1. Node.js:
Es necesario tener instalado desde 20.13.1 en adelante.
[Pagina Oficial de Node.js](https://nodejs.org/en/download).

- Si ya tienes Node.js instalado, puedes revisar su versión con el comando en la cmd:
```
npm --version
```
<a id="tres"></a>
### 3. Docker:
Para levantar la APP necesitaremos Docker Desktop. El instalador se puede descargar desde su pagina oficial: [Docker.com](https://www.docker.com/products/docker-desktop/)
<a id="cuatro"></a>
## Instrucciones de uso: <a name="instrucciones"></a>
Para poder levantar esta APP y consumir la API es necesario cumplir con los prerrequisitos para proceder a instalar las dependencias y correr el código fuente.
<a id="cinco"></a>
### 1. Levantar API con Docker:
Para poder levantar la API como servidor debemos encapsularla en un contenedor con Docker, esto se hace corriendo el `"Dockerfile"` con comandos.

```bash
docker build -t api-ferremass .
docker run -p 4000:4000 api-ferremas
```

**NOTA:** Debe estar abierto el **"Docker Desktop"** para levantar la API con el contenedor.
<a id="seis"></a>

### 2. Levantar REACT APP con Docker:
Para poder levantar la APP de REACT debemos ejecutar los siguientes comandos para abrir el contenedor en el directorio donde se encuentra "package.json".

```bash
docker build -t ferremas-app .
docker run -p 3000:3000 ferremas-app
```

**NOTA:** Debe estar abierto el **"Docker Desktop"** para levantar la APP con el contenedor.
<a id="siete"></a>

### 3. Consumir API:
Para consumir la api, basta con abrir el enlace **`"http://localhost:3000`** del prototipo con un navegador (ej. Chrome) y visualizar si muestra los productos. Desde la consola del "Dev-Tools" se puede observar si se están haciendo las consultas HTTP a la API en caso de que haya un error.

**NOTA:** La API será consumida a través de un componente el cual se conecta con la dirección donde esta alojada la API.
`http://localhost:4000/api-docs`.  (Documentación de la API con Swagger)
