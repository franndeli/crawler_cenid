const fs = require('fs');

function Limpieza(filePath, newFilePath, callback) {
    //console.log(filePath);
    console.log("Vamos a limpiar el corpus...");

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error leyendo el archivo:", err);
            return;
        }

        const json = JSON.parse(data);

        if (json.document && Array.isArray(json.document)) {
            json.document.forEach(obj => {
                if (obj.content) {
                    //-------- PRIMERO ELIMINAMOS CARÁCTERES ----------//
                    
                    const urlRegex = /https?:\/\/[^\s]+/g;
                    let urls = [];
                    obj.content = obj.content.replace(urlRegex, (url) => {
                        // Verificar si el enlace es seguido inmediatamente por texto no parte de la URL
                        const match = /^(https?:\/\/[^\s]+)([A-Za-zÁÉÍÓÚÑáéíóúñ]+)/.exec(url);
                        if (match) {
                            url = match[1]; // URL limpia
                            // Añadir el texto pegado a la lista de URLs como texto separado para ser procesado
                            urls.push(url, match[2]);
                            return "URLTEMP TEXTTEMP"; // Marcadores temporales para URL y texto pegado
                        } else {
                            urls.push(url); // Guardar el enlace
                            return "URLTEMP"; // Marcador temporal único para URL
                        }
                    });

                    //if (!/^https?:\/\/|www\./i.test(obj.content)) {
                        // Limpieza de guiones bajos si no van entre 2 letras
                        obj.content = obj.content.replace(/(?<![A-Za-z])_|_(?![A-Za-z])/g, '');
                    //}

                    // Limpieza de dos o más puntos seguidos
                    obj.content = obj.content.trim().replace(/\.{2,}/g, '');

                    //Limpieza de \n saltos de línea
                    obj.content = obj.content.replace(/\n/g, ' ');

                    //Limpieza de \t tabulaciones
                    obj.content = obj.content.replace(/\t/g, ' ');

                    // Reemplazo de punto medio por guión solo si va seguido de una palabra o un espacio y una palabra
                    obj.content = obj.content.replace(/[•»■─](?=\s?\w)/g, '-');

                    /*obj.content = obj.content.replace(/©/g, ' ');
                    obj.content = obj.content.replace(/»/g, ' ');*/

                    obj.content = obj.content.replace(/[^\x20-\x7E{äëïöüáéíóúàèìòùÁÉÍÓÚÀÈÌÒÙüÜñÑ]/g, '');

                    //---------- AHORA LIMPIAMOS ESPACIOS ---------//

                    //Limpieza de + o 2 espacios y lo convierte en 1 
                    obj.content = obj.content.replace(/\s{2,}/g, ' ');

                    //Si hay un espacio antes de un . o , los quita
                    obj.content = obj.content.replace(/\s{1,}(?=[\.,])/g, '');

                    //if (!/^https?:\/\//i.test(obj.content)) {
                        //Si hay una minúscula seguida de una mayúscula juntas. Las separa
                        obj.content = obj.content.replace(/([a-z])([A-Z])/g, '$1 $2');

                        //Si una letra y un número van juntas, las separa
                        obj.content = obj.content.replace(/(\d)([A-Za-z])/g, '$1 $2').replace(/([A-Za-z])(\d)/g, '$1 $2');

                        //Separar palabras que terminan justo antes de un signo de interrogación o exclamación que se abre
                        //Separar signos de interrogación o exclamación que cierran y palabras que los siguen sin espacio
                        obj.content = obj.content.replace(/(\w)([¿¡])/g, '$1 $2').replace(/([?!])(\w)/g, '$1 $2');
                        
                        
                        //Si hay un . , seguido de una letra, insertar un espacio.
                        //obj.content = obj.content.replace(/[\.,:;](?=[A-Za-zÁÉÍÓÚÑáéíóúñ])/g, '$1 $2');
                        obj.content = obj.content.replace(/([.,:;])([A-Za-zÁÉÍÓÚÑáéíóúñ])/g, '$1 $2');
                    //}
                    
                    //ELimina numeros incoherentes de inicio de pág
                    obj.content = obj.content.replace(/^\d+(\.\d+)?/, '');

                    //Elimina patrón de palabras repetidas(al menos 2 veces) al principio de página
                    obj.content = obj.content.replace(/^\b(\w+)\b(?:\s+\1\b)(?=[A-ZÁÉÍÓÚÑ]){2,}/gi, '');

                    //Quita todos los espacios al principio y final
                    obj.content = obj.content.trim();

                    // Ajuste para evitar la eliminación de todas las instancias de dos puntos juntos.
                    obj.content = obj.content.replace(/\.\./g, ''); 
                
                    // Marcar consonantes solas (excepto 'y'), asegurando que estén predecedidas por espacios al principio o en los extremos de una línea
                    obj.content = obj.content.replace(/(^|\s)([bcdfghjklmnpqrstvwxz])(\s|$)/gi, '$1[$2]$3');
                    obj.content = obj.content.replace(/URLTEMP/g, () => urls.shift());

                    // Este paso asume que el texto que estaba incorrectamente pegado al enlace ya ha sido procesado si es necesario
                    // Puede necesitar ajustes dependiendo de cómo quieras manejar el texto separado
                    obj.content = obj.content.replace(/TEXTTEMP/g, (match) => urls.shift() + " ");
                }
            });
        } else {
            console.error("No se encontró un array válido en el JSON.");
        }

        const modifiedData = JSON.stringify(json, null, 2);

        fs.writeFile(newFilePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error("Error escribiendo el archivo:", err);
                callback(err);
            } else {
                console.log("Archivo modificado guardado exitosamente.");
                callback(null);
            }
        });
    });
}

module.exports = Limpieza;
