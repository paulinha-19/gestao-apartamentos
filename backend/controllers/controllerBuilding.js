const { Edificio } = require("../models");
const { floor } = require("../utils/generateAllFloors");

const getAllBuilding = async (req, res) => {
    try {
        const building = await Edificio.findAll();
        if (building.length === 0) {
            return res.status(404).json({ message: 'Nenhum edifício encontrado' });
        }
        return res.status(200).json(building);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
    }
}

const getAllBuildingName = async (req, res) => {
    try {
        const building = await Edificio.findAll({
            attributes: ['id', 'nomeEdificio'],
            order: [
                ['nomeEdificio', 'ASC'],
            ]
        });
        if (building.length === 0) {
            return res.status(404).json({ message: 'Nenhum nome encontrado' });
        }
        return res.status(200).json(building);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
    }
}

const getAllBuildingFloor = async (req, res) => {
    const { id } = req.params;
    try {
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: 'Edificio não encontrado' });
        }
        const floors = floor(building.qtdAndarEdificio);
        return res.status(200).json(floors);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getOneBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: "Edificio não encontrado" });
        }
        return res.status(200).json(building);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
    }
}

const createBuilding = async (req, res) => {
    try {
        const { nomeEdificio, enderecoEdificio, qtdAndarEdificio, qtdApartPorAndar } = req.body;
        let nameBuildingExists = await Edificio.findOne({ where: { nomeEdificio } });
        if (!nameBuildingExists) {
            const newBuilding = await Edificio.create({
                nomeEdificio,
                enderecoEdificio,
                qtdAndarEdificio,
                qtdApartPorAndar
            });
            return res.status(201).json(newBuilding);
        }
        return res.status(400).json({
            message: `O nome ${nomeEdificio} já existe, tente outro nome!`,
        });

    } catch (error) {
        console.log("SEQUELIZE", error);
        return res.status(500).json({ message: `Ocorreu um erro ao cadastrar o edifício: ${error.message}` });
    }
}

const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeEdificio, enderecoEdificio, qtdAndarEdificio, qtdApartPorAndar } = req.body;
        const nameBuildingExists = await Edificio.findOne({ where: { nomeEdificio } });
        const idExists = await Edificio.findByPk(id);
        if (nameBuildingExists) {
            return res.status(400).json({
                message: `O nome ${nomeEdificio} já existe. Tente outro nome.`,
            });
        }
        if (idExists) {
            await Edificio.update(req.body, {
                where: {
                    id: id
                }
            })
            return res.status(201).send({
                nomeEdificio,
                enderecoEdificio,
                qtdAndarEdificio,
                qtdApartPorAndar
            });
        }
        return res.status(404).send({
            message: `Os dados não podem ser atualizados pois não foram encontrados`,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao editar o edifício: ${error.message}` });
    }
}

const deleteBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: "Edificio não encontrado" });
        }
        await building.destroy();
        return res.status(200).json({ message: "Edificio deletetado com sucesso" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao deletar o edifício: ${error.message}` });
    }
}

module.exports = {
    getAllBuilding,
    getOneBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
    getAllBuildingName,
    getAllBuildingFloor
}
