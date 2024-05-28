//Victor Reis

const express = require('express');
var admin = require("firebase-admin");

var serviceAccount = require("./projeto-dashboard-5eaa5-firebase-adminsdk-yoila-c3f55d10c5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const app = express();
const port = 3000;

app.get('/api/informacoes/:cpf', async (req, res) => {
  try {
    const { cpf } = req.params;

    const snapshot = await admin.firestore().collection('clientes').where('cpf', '==', cpf).get();

    if(snapshot.empty) {
        snapshot = await admin.firestore().collection('clientes').where('cnpj', '==', cpf).get();
    }
    
    if (snapshot.empty) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    let userData = [];

    snapshot.forEach(doc => {
    userData.push(doc.data().nome);
    userData.push(doc.data().email);
    userData.push(doc.data().ramo);
    });

    res.json(userData);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/api/informacoes/`);
});
