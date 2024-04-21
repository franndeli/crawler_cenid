# Proyecto de Limpieza de Corpus para Machine Learning

## Descripción
Este proyecto ha sido desarrollado en el Instituto de Investigación de Informática de Alicante, específicamente en la rama que trabaja el CENID (Centro de Creación y Limpieza de Corpus e Inteligencia Artificial). El objetivo principal es proporcionar una herramienta que facilite la limpieza de corpus utilizados en el aprendizaje automático, eliminando impurezas que pueden ser introducidas durante el proceso de recolección de datos por crawlers de Python.

La aplicación está construida utilizando React.js para la interfaz de usuario, permitiendo una interacción eficiente y amigable para los usuarios que necesitan limpiar datos de manera efectiva.

## Tecnologías Utilizadas
- **Frontend:** React.js
- **Backend:** Node.js (utilizando scripts de crawlers en Python para la recolección de datos)

## Configuración del Proyecto
### Requisitos Previos
Asegúrate de tener instalado Node.js y npm en tu sistema para poder ejecutar el proyecto. Puedes descargarlos e instalarlos desde [Node.js official website](https://nodejs.org/).

### Instalación
Para iniciar el proyecto, necesitarás configurar tanto el frontend como el backend. Sigue estos pasos para cada uno:

#### Frontend
1. Navega a la carpeta `/client`:
   ```bash
   cd client
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia la aplicación React:
   ```bash
   npm start
   ```
   Esto compilará la aplicación y abrirá automáticamente una pestaña en tu navegador en `localhost:3000`.

#### Backend
1. Navega a la carpeta base del backend `/crawler_CENID`:
   ```bash
   cd crawler_CENID
   ```
2. Al igual que en el frontend, instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Inicia el servidor backend:
   ```bash
   npm start
   ```

Una vez que ambos servidores estén funcionando, la aplicación debería estar accesible a través de `localhost:3000`. Si no se abre automáticamente, puedes introducir esta dirección en tu navegador para acceder a la interfaz de usuario de la aplicación.

## Uso
La interfaz de usuario de React te permitirá cargar los datos del corpus y aplicar diferentes herramientas y técnicas de limpieza para preparar los datos para su uso en modelos de aprendizaje automático. Sigue las instrucciones en pantalla para realizar las operaciones de limpieza necesarias.
