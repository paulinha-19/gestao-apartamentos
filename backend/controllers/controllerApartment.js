const { Apartamento, Edificio } = require("../models");
const { generateApartmentNumbers } = require("../utils/generateApartmentsNumbers");

const getAllApartment = async (req, res) => {
    try {
        const apartment = await Apartamento.findAll({
            order: [['id', 'ASC']],
            include: [{ model: Edificio }]
        });
        return res.status(200).json(apartment);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao buscar os apartamentos: ${error.message}` });
    }
}

const getAOneApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartamento.findByPk(id);
        if (!apartment) {
            return res.status(404).json({ message: "Apartamento não encontrado" });
        }
        return res.status(200).json(apartment);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao buscar o apartamento: ${error.message}` });
    }
}

const getApartmentsNumbers = async (req, res) => {
    const { id, andar } = req.params;
    try {
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: 'Edifício não encontrado' });
        }

        // Busca os apartamentos que já existem naquele andar
        const existingApartments = await Apartamento.findAll({
            where: {
                andarApartamento: andar,
                edificioId: id
            },
            attributes: ['numeroApartamento'],
            include: Edificio
        });
        const apartmentNumbers = generateApartmentNumbers(andar, building.qtdApartPorAndar);
        // Filtra os números gerados que ainda não foram usados
        const availableApartments = apartmentNumbers.filter(
            (number) => !existingApartments.some((apartment) => apartment.numeroApartamento === number)
        );
        return res.status(200).json(availableApartments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar apartamentos' });
    }
}

const createApartment = async (req, res) => {
    const { numeroApartamento, andarApartamento } = req.body;
    const { id } = req.params;
    try {
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: "Edifício não encontrado" });
        }
        // Verifica se o andar está cheio
        const existingApartments = await Apartamento.findAll({
            where: {
                andarApartamento: andarApartamento,
                edificioId: id,
            },
        });
        const numberOfApartmentsOnFloor = existingApartments.length;
        if (numberOfApartmentsOnFloor >= building.qtdApartPorAndar) {
            return res.status(400).json({ message: `O andar ${andarApartamento} do edificio ${building.nomeEdificio} está lotado` });
        }
        // Cria o novo apartamento
        const newApartment = await Apartamento.create({
            numeroApartamento: numeroApartamento,
            andarApartamento: andarApartamento,
            edificioId: id,
        });
        return res.status(201).json(newApartment);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao cadastrar o apartamento: ${error.message}` });
    }
}

const getAvailableApartments = async (req, res) => {
    try {
        const apartments = await Apartamento.findAll({
            order: [['id', 'ASC']],
            where: {
                disponivelApartamento: true,
            },
            include: {
                model: Edificio,
                attributes: ['id', 'nomeEdificio'],
            },
        });

        if (apartments.length === 0) {
            return res.status(404).json({ message: 'Nenhum apartamento disponível encontrado' });
        }

        return res.status(200).json(apartments);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
    }
};


const uptadeApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartamento.findByPk(id);
        if (!apartment) {
            return res.status(404).json({
                message: `Os dados não podem ser atualizados pois não foram encontrados`,
            })
        }
        const { valor_aluguel_mensal } = req.body;
        await apartment.update({ valor_aluguel_mensal }, { fields: ['valor_aluguel_mensal'] });
        return res.status(200).json(apartment);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao editar o apartamento: ${error.message}` });
    }
}

const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartamento.findByPk(id);
        if (!apartment) {
            res.status(404).json({ message: "O apartamento que você está tentando deletar não existe na base de dados" });
        }
        await apartment.destroy();
        return res.status(200).json({ message: `Apartamento deletetado com sucesso` });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao deletar o apartamento: ${error.message}` });
    }
}

module.exports = {
    getAllApartment,
    getAOneApartment,
    createApartment,
    uptadeApartment,
    deleteApartment,
    getApartmentsNumbers,
    getAvailableApartments
}