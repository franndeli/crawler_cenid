import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './App.css';

function HomePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const [textInput, setTextInput] = useState('');
  
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
                a.download = selectedFile.name.replace(/\.json$/, '') + "-cleaned.json"; // Asume que el archivo original es .json
                document.body.appendChild(a); // Esto es necesario para que funcione en Firefox
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
  
    const AnalyzeJson = () => {
      //Analizar que elementos tiene el JSON y qué parte de él queremos limpiar
    }

    const handleTextInputChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        // Aquí podrías también llamar directamente a handleLimpieza si es necesario
    };
  
    const handleClearText = () => {
      setTextInput('');
      document.getElementById('textarea').value = ""; // Limpia el campo de entrada del archivo
    };
  
    const handleClearFile = () => {
      setSelectedFile(null);
      document.getElementById('json-file').value = ""; // Limpia el campo de entrada del archivo
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Limpiador de Corpus</h1>
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
          
          <h3>Por archivo:</h3>
          <div className="input_button">
            <input type="file" id="json-file" accept=".json" onChange={handleFileChange} />
            <button onClick={handleClearFile}>Borrar</button>
          </div>
  
          <button className="continuar" onClick={handleLimpieza}>Continuar</button>
        </main>
      </div>
    );
  }

  export default HomePage;