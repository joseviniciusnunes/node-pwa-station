const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

const fileDir = path.resolve('data.json');

if (!fs.existsSync(fileDir)) {
    console.log('CREATE DATA FILE:', fileDir);
    fs.writeFileSync(fileDir, JSON.stringify({ clientes: [] }));
}

console.log('DATA:', fileDir);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).send({ status: 'ok' });
});

app.get('/clientes', async(req, res) => {
    try {
        const clientes = await jsonfile.readFile(fileDir);
        return res.send(clientes);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post('/clientes', async(req, res) => {
    try {
        let { body } = req;
        let response = await jsonfile.readFile(fileDir);
        body.id = Math.random().toString(36).substr(2, 9);
        body.dtTransacao = new Date().toISOString();
        response.clientes.reverse();
        response.clientes.push(body);
        response.clientes.reverse();
        jsonfile.writeFile(fileDir, response);
        return res.status(200).send(body);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.delete('/clientes', async(req, res) => {
    try {
        let { id } = req.body;
        let response = await jsonfile.readFile(fileDir);
        response.clientes = response.clientes.filter((cliente) => cliente.id !== id);
        jsonfile.writeFile(fileDir, response);
        return res.status(200).send();
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

const porta = process.env.PORT || 3001;

app.listen(porta);

console.log('ONLINE | PORT:', porta);