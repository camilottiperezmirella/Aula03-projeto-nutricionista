const express = require("express")
const consultas = require("../dados.json")

const calcularIMC = () => {
    consultas.forEach(c => {
        c.imc = c.peso / (c.altura * c.altura)
        c.imc = Number(c.imc.toFixed(2))
    })
}

const listarConsultas = (req, res) => {
    calcularIMC()
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        consultas.push(req.body)
        res.send("Consulta cadastrada com sucesso")
    } else {
        res.send("Erro ao cadastrar consulta")
    }
}

const app = express()
const porta = 3000

app.use(express.urlencoded({ extended: true }))

app.get("/", listarConsultas)
app.post("/", novaConsulta)

app.listen(porta, () => {
    console.log(`Cliente: http://127.0.0.1:5500/cliente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})