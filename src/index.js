import express from 'express'
const app = express()
const port = 4000

app.use(express.urlencoded({extended: true})) //converte cararc. especiais em html entity
app.use(express.json()) // Fará o parse no conteúdo JSON
app.disable('x-powered-by') //Removendo por questões de segurança

import rotasFuncionarios from './routes/funcionarios.js'

//Rotas Restfull do nosso app
app.use('/api/funcionarios', rotasFuncionarios)

//Definimos a nossa rota default
app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API Cadastro de Funcionários 100% funcional!',
        versao: '1.0.1'
    })
})

// Rota de conteúdo público
app.use('/', express.static('public'))

//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, function(){
    console.log(`🚀Servidor web rodando na porta ${port}`)
})