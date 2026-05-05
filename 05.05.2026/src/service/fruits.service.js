import { pool } from "../config/db.js"

class FruitsService {

    async getAll() {

        try {

            const query = "SELECT * FROM fruits"

            const res = await pool.query(query)

            return res.rows

        } catch (error) {

            console.error(error)
        }
    }

    async getById(id) {

        try {

            const query = "SELECT * FROM fruits WHERE id = $1"

            const res = await pool.query(query, [id])

            return res.rows[0]

        } catch (error) {

            console.error(error)
        }
    }

    async create(nome, cor) {

        try {

            const query = `
                INSERT INTO fruits (nome, cor)
                VALUES ($1, $2)
                RETURNING *
            `

            const res = await pool.query(query, [nome, cor])

            return res.rows[0]

        } catch (error) {

            console.error(error)
        }
    }

    async update(id, nome, cor) {

        try {

            const query = `
                UPDATE fruits
                SET nome = $1, cor = $2
                WHERE id = $3
                RETURNING *
            `

            const res = await pool.query(query, [nome, cor, id])

            return res.rows[0]

        } catch (error) {

            console.error(error)
        }
    }

    async patch(id, campos) {

        try {

            const keys = Object.keys(campos)

            const values = Object.values(campos)

            const setString = keys
                .map((key, index) => `${key} = $${index + 1}`)
                .join(", ")

            const query = `
                UPDATE fruits
                SET ${setString}
                WHERE id = $${keys.length + 1}
                RETURNING *
            `

            const res = await pool.query(query, [...values, id])

            return res.rows[0]

        } catch (error) {

            console.error(error)
        }
    }

    async delete(id) {

        try {

            const query = `
                DELETE FROM fruits
                WHERE id = $1
            `

            await pool.query(query, [id])

            return { message: "Fruit deleted" }

        } catch (error) {

            console.error(error)
        }
    }
}

export const fruitsService = new FruitsService()