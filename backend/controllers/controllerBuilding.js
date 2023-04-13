import Edificio from "../models/edificio.js";

const getAllBuilding = async (req, res) => {
    try {
        const building = await Edificio.findAll();
        return res.status(200).json(building);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
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

const createBuilding = async (req, res, next) => {
    try {
        const { nome, qtd_andares, qtd_apart_por_andar } = req.body;
        let nameBuildingExists = await Edificio.findOne({ where: { nome } });
        if (!nameBuildingExists) {
            const newBuilding = await Edificio.create({
                nome,
                qtd_andares,
                qtd_apart_por_andar
            });
            return res.status(201).json(newBuilding);
        }
        return res.status(400).json({
            message: `O nome do edificio deve ser unico. ${nome} já existe tente outro nome!`,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao cadastrar o edifício: ${error.message}` });
        next(error);
    }
}

const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, numero_andares, apartamentos_por_andar } = req.body;
        const nameBuildingExists = await Edificio.findOne({ where: { nome } });
        const idExists = await Edificio.findByPk(id);
        if (nameBuildingExists) {
            return res.status(400).json({
                message: `O ${nome} que você está tentando alterar já existe. Tente outro nome.`,
            });
        }
        if (idExists) {
            await Edificio.update(req.body, {
                where: {
                    id: id
                }
            })
            return res.status(201).send({
                nome,
                numero_andares,
                apartamentos_por_andar
            });
        }
        return res.status(404).send({
            message: `Os dados não podem ser atualizados pois não foram encontrados`,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao editar o edifício: ${error.message}` });
    }
}

const deleteBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const building = await Edificio.findByPk(id);
        if (!building) {
            res.status(404).json({ message: "Edificio não encontrado" });
        }
        await building.destroy();
        return res.status(200).json({ message: "Edificio deletetado com sucesso" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao deletar o edifício: ${error.message}` });
    }
}

export default { getAllBuilding, getOneBuilding, createBuilding, updateBuilding, deleteBuilding }