const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/calcular-imc', (req, res) => {            
  const { peso, altura } = req.body;
  


  if (!peso || !altura) {
    return res.status(400).json({ error: 'É necessário informar o peso e a altura.' });
  }

  const imc = peso / (altura * altura);
  let resultado;

  if (imc < 18.5) {
    resultado = 'Magro';
  } else if (imc >= 18.5 && imc < 24.9) {
    resultado = 'Peso normal';
  } else {
    resultado = 'Acima do peso';
  }

  res.json({ imc, resultado });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3200, () => {
  console.log('Servidor rodando na porta 3200');
});
