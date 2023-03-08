const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Configurar body-parser para lidar com JSON
app.use(bodyParser.json());

// Criar conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha_do_mysql',
  database: 'seu_banco_de_dados'
});

// Conectar ao banco de dados MySQL
connection.connect((error) => {
  if (error) {
    console.log('Erro ao conectar ao banco de dados: ' + error);
  } else {
    console.log('Conexão bem sucedida ao banco de dados!');
  }
});

// Rota para listar todos os usuários
app.get('/people', (req, res) => {
  const query = 'SELECT * FROM people';
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: 'Error', 
        data: [], 
        message: "Erro ao consultar os dados!!!"
      });    
    } else {
      return res.status(200).json(results);
    }
  });
});

// Rota para criar um novo usuário
app.post('/people', (req, res) => {
  const query = 'INSERT INTO people (id, name) VALUES (?, ?)';
  const params = [req.body.name, req.body.email];
  connection.query(query, params, (error, result) => {
    if (error) {
      console.log('Erro ao executar a consulta: ' + error);
      res.sendStatus(500);
    } else {
      res.json({ message: 'Usuário criado com sucesso!' });
    }
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});
