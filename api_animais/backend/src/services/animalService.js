import animalRepository from "../repositories/animalRepository.js";

export const animalService = {
    async getAllAnimais() {
        return await animalRepository.findAll();
    },

    async getAnimal(id){ const animalExistente = await animalRespository.findById(id);
        if(!animalExistente){
            throw new Error('Animal não encontrado');}},

    async createAnimal(animalRequisicao){
        if (animalRequisicao.idade<0){
            throw new Error('A idade do animaltem que ser maior do que 0')
        }
        return await animalRepository.create(animalRequisicao);
    },

    async updateAnimal(id, animalRequisicao){
        const animalExistente = await animalRespository.findById(id);
        if(!animalExistente){
            throw new Error('Animal não encontrado');

            return await animalRepository.update(id, animalRequisicao);
        }
    }
}