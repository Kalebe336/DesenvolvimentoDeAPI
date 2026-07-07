import query from "../config/db.js";

export const animalRepository = {
    async findAll(){
        const res = await query("SELECT*FROM {nome_tabela} ORDER BY {COLUNA_TABELA}");
        return res.rows;
    },

    async create (animal){
        const {nome, especie, idade, status_saude} = animal;
        const sql ='INSERT INTO animal (nome, especie, idade, status_saude) VALUES ($1, $2, $3, $4) RETURNING *;';
        const res = await query(sql, [nome, especie, idade, status_saude]);
        return res.rows[0];
    }
}