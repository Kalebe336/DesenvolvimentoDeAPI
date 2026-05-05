import express from "express"
import "dotenv/config"
import { fruitsRoute } from "./routes/fruits.route.js"

const app = express()

const PORT = process.env.API_PORT

app.use(express.json())

app.get("/", (req, res) => {

    return res.json("API funcionando")
})

app.use("/fruits", fruitsRoute)

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)
})