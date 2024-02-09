const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

const banco_de_dados = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'matriculas'
})

banco_de_dados.connect((err) => {
    if (err) {console.log('Erro na conexão co mysql' , err)}
    else{ console.log('Conectado com sucesso ao Mysql!')}
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/public', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/css/style.css'))
})

app.get('/images', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/images/'))
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/js/index.js'))
})


app.post('/matricular', (req, res) => {

const dados = {
    "nome": req.body.nome_m,
    "cpf": req.body.cpf_m,
    "dn": req.body.dn_m,
    "email": req.body.email_m,
    "telefone": req.body.telefone_m
}

    const valores = [dados.nome, dados.cpf, dados.dn, dados.email, dados.telefone]

    banco_de_dados.query('INSERT INTO dados (nome, CPF, nascimento, email, telefone) VALUES (?, ?, ?, ?, ?)', valores, (err, results) => {
        if (err) { 
            res.status(500).send('Erro ao inserir dados')
            console.log(err)
        } else {
            res.send('Dados inseridos com sucesso')
        }
    })

})

app.listen(port, () => {
    console.log('O servidor está no ar 😎')
})