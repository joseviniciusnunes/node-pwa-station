const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const path = require('path');

const fileDir = path.resolve('data.json');

const jsonfile = require('jsonfile');

console.log('data:', fileDir);

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

const porta = process.env.PORT_DEPLOY || 3001;

app.listen(porta);

console.log('ONLINE | PORT:', porta);