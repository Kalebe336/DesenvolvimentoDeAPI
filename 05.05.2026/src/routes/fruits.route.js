import { Router } from "express"
import { fruitsService } from "../service/fruits.service.js"

export const fruitsRoute = Router()

fruitsRoute.get("/", async (req, res) => {

    const fruits = await fruitsService.getAll()

    return res.json(fruits)
})

fruitsRoute.get("/:id", async (req, res) => {

    const { id } = req.params

    const fruit = await fruitsService.getById(id)

    return res.json(fruit)
})

fruitsRoute.post("/", async (req, res) => {

    const { nome, cor } = req.body

    const fruit = await fruitsService.create(nome, cor)

    return res.json(fruit)
})

fruitsRoute.put("/:id", async (req, res) => {

    const { id } = req.params

    const { nome, cor } = req.body

    const fruit = await fruitsService.update(id, nome, cor)

    return res.json(fruit)
})

fruitsRoute.patch("/:id", async (req, res) => {

    const { id } = req.params

    const campos = req.body

    const fruit = await fruitsService.patch(id, campos)

    return res.json(fruit)
})

fruitsRoute.delete("/:id", async (req, res) => {

    const { id } = req.params

    const result = await fruitsService.delete(id)

    return res.json(result)
})