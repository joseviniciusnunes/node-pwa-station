const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const fileDir = path.resolve('data.json');

if (!fs.existsSync(fileDir)) {
    console.log('CREATE DATA FILE:', fileDir);
    fs.writeFileSync(fileDir, JSON.stringify({ clientes: [] }));
}

const jsonfile = require('jsonfile');

console.log('DATA:', fileDir);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get('/clientes', async(req, res) => {
    const clientes = await jsonfile.readFile(fileDir);
    return res.send(clientes);
});

app.post('/clientes', (req, res) => {
    return res.status(200).send();
});

app.delete('/clientes', (req, res) => {
    return res.status(200).send();
});

const porta = process.env.PORT || 3001;

app.listen(porta);

console.log('ONLINE | PORT:', porta);