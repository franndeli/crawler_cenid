import React, { useState } from "react";
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInput, setTextInput] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // Aquí podrías leer y procesar el archivo si es necesario
  };

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
    // Aquí puedes manejar el texto ingresado según sea necesario
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
        <h3>Por texto:</h3>
        <div class="textarea_button">
          <textarea id="textarea" 
            value={textInput} 
            onChange={handleTextInputChange} 
            placeholder="Pega tu texto aquí"
          />
          <button onClick={handleClearText}>Borrar</button>
        </div>
        
        <h3>Por archivo:</h3>
        <div class="input_button">
          <input type="file" id="json-file" accept=".json" onChange={handleFileChange} />
          <button onClick={handleClearFile}>Borrar</button>
        </div>

        <button class="continuar" onClick={null}>Continuar</button>
      </main>
    </div>
  );
}

export default App;
