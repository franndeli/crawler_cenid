// server/index.js
const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Limpieza = require('./limpiador');

const PORT = process.env.PORT || 3002;

const app = express();

const cors = require('cors');
app.use(cors());


app.use(fileUpload({
    createParentPath: true // Esto asegura que se creen los directorios si no existen
}));

app.post('/limpieza', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No se subió ningún archivo.');
    }
    const file = req.files.file;
    const filePath = 'server/archivos_temporales/' + file.name;
    const newFilePath = 'server/limpieza/' + file.name;

    file.mv(filePath, err => {
        if (err) {
          return res.status(500).send(err);
        }

        Limpieza(filePath, newFilePath, (error) => {
          if (error) {
            return res.status(500).send(error);
          }
          
          res.download(newFilePath, file.name, (err) => {
            if (err) {
                res.status(500).send("No se pudo descargar el archivo.");
            }
          });
        });
      });
});
  

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});