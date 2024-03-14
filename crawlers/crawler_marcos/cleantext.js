const fs = require('fs');

// Leer el archivo JSON
fs.readFile('crawlers\\crawler_marcos\\Estatutos de Plena inclusión Castilla y León(LF).json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    try {
        // Convertir el contenido del archivo a un objeto JavaScript
        const documento = JSON.parse(data);

        // Función para limpiar el texto
        function limpiarTexto(documento) {

            // Filtrar y limpiar cada página de texto
            const textoLimpiado = documento.document.map(page => {

                // Eliminar caracteres no deseados
                let cleanContent = page.content.replace(//g, '');

                // Eliminar espacios y saltos de línea adicionales
                cleanContent = cleanContent.trim().replace(/\n+/g, ' ');
                cleanContent = cleanContent.trim().replace(/ +/g, ' ');
                cleanContent = cleanContent.trim().replace(/^[0-9][0-9] Estatutos Sociales de Plena inclusión en Lectura Fácil /g, '');
                cleanContent = cleanContent.trim().replace(/^[0-9][0-9] /g, '');
                cleanContent = cleanContent.trim().replace(/^[0-9] /g, '');
                cleanContent = cleanContent.trim().replace(/ ./g, '.');



                // Asignar el contenido limpiado a la página
                page.content = cleanContent;

                return page;
            });

            // Actualizar el documento con el texto limpiado
            documento.document = textoLimpiado;

            return documento;
        }

        // Llamar a la función para limpiar el texto
        const documentoLimpiado = limpiarTexto(documento);

        // Convertir el documento limpiado de nuevo a JSON
        const documentoLimpiadoJSON = JSON.stringify(documentoLimpiado, null, 2);

        // Escribir el documento limpiado de nuevo en un archivo JSON
        fs.writeFileSync('crawlers\\crawler_marcos\\documento_limpiado.json', documentoLimpiadoJSON, 'utf8');

        console.log('El archivo documento_limpiado.json se ha creado con éxito.');
    } catch (error) {
        console.error('Error al procesar el archivo JSON:', error);
    }
});