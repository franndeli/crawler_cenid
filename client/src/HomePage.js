import React, { useState, useCallback } from "react";
import GamingSexFreeHouse from "./InnovationH@ckFest23-415.jpg"
import './App.css';

function HomePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    //const [setTextInput] = useState('');

    const handleFileChange = useCallback((e) => {
      let file = e.target.files[0]; // Si se selecciona un archivo mediante el input
      if (file && file.type === "application/json") {
          setSelectedFile(file);
      }
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault(); // Necesario para permitir el evento drop
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault(); // Prevenir la apertura del archivo
        let files = e.dataTransfer.files; // Obtener los archivos arrastrados
        if (files.length > 0 && files[0].type === "application/json") {
            setSelectedFile(files[0]); // Actualizar el estado si el archivo es un JSON
            // Opcional: si deseas llamar a handleLimpieza directamente después de soltar el archivo, puedes hacerlo aquí.
        }
    }, []);
  
    const handleLimpieza = () => {
        console.log("Empezamos con la limpieza");
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            fetch('http://localhost:3002/limpieza', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                console.log("Respuesta recibida");
                return response.blob()
            })
            .then(blob => {
                console.log("Blob recibido");
                const url = window.URL.createObjectURL(blob);
                console.log("URL creada:", url);
                const a = document.createElement('a');
                a.href = url;
                a.download = selectedFile.name.replace(/\.json$/, '') + "-cleaned.json";
                document.body.appendChild(a); //Para que funcione en Firefox
                a.click();
                a.remove();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            console.log('No hay archivo seleccionado');
        }
    }
  
    /*const AnalyzeJson = () => {
      //Analizar que elementos tiene el JSON y qué parte de él queremos limpiar
    }*/

    /*const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };*/

    /*const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        // Aquí podrías también llamar directamente a handleLimpieza si es necesario
    };*/
  
    /*const handleClearText = () => {
      setTextInput('');
      document.getElementById('textarea').value = ""; // Limpia el campo de entrada del archivo
    };*/
  
    const handleClearFile = () => {
      setSelectedFile(null);
      document.getElementById('json-file').value = ""; // Limpia el campo de entrada del archivo
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Corpus Cleaner</h1>
          <p>For .json</p>
        </header>
        <main className="App-main">
          {/*<h3>Por texto:</h3>
          <div className="textarea_button">
            <textarea id="textarea" 
              value={textInput} 
              onChange={handleTextInputChange} 
              placeholder="Pega tu texto aquí"
            />
            <button onClick={handleClearText}>Borrar</button>
          </div>*/}
          
          <h4>Upload your file and click "CLEAN IT" to download it cleaned</h4>
          <div
            className="drop-container"
            id="dropcontainer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              id="jsonFiles"
              accept=".json"
              required
              onChange={handleFileChange}
            />
          </div>
  
          <div className="wrapper">
            <button className="continuar" onClick={handleLimpieza}>CLEAN IT</button>
          </div>
        </main>
        <footer className="App-footer">
          <p>© Trabajo realizado por el grupo Gaming Free House <img className="imgGamingSexFreeHouse" alt="GamingSexFreeHouse" src={GamingSexFreeHouse}></img> - Todos los derechos reservados</p>
        </footer>
      </div>
    );
  }

  export default HomePage;