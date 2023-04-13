import Apartamento from "../models/apartamento.js";
import Edificio from "../models/edificio.js";

const getAllApartment = async (req, res) => {
    try {
        const apartment = await Apartamento.findAll({ order: [['numero', 'ASC']], include: [{ model: Edificio }] });
        return res.status(200).json(apartment);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao buscar os apartamentos: ${error.message}` });
    }
}

const getAOneApartment = async () => {
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

const getAvailableApartment = async (req, res) => {
    try {
        const apartment = await Apartamento.findAll();
        const disponivel = apartment.disponivel;
        const apartamentos = await Apartamento.findAll({ where: { disponivel: true } });
        if (!apartment) {
            return res.status(404).json({ message: "Apartamento não encontrado" });
        }

        return res.status(200).json(apartment);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Ocorreu um erro ao buscar o apartamento: ${error.message}` });
    }
}

const createApartment = async (req, res) => {
    try {
        const { andar, valor_aluguel_mensal } = req.body;
        const { id } = req.params;
        const building = await Edificio.findByPk(id);
        if (!building) {
            return res.status(404).json({ message: "Edifício não encontrado" });
        }
        const numberApartmentsOnFloor = await Apartamento.count({
            where: { edificioId: id, andar }
        });
        if (andar <= 0 || andar > building.qtd_andares) {
            return res.status(400).json({ message: `O ${building.nome} tem apenas ${building.qtd_andares} andar e você está tentando inserir o apartamento em um andar que não existe` });
        }
        if (numberApartmentsOnFloor >= building.qtd_apart_por_andar) {
            return res.status(400).json({ message: `Você não pode adicionar mais apartamentos no andar ${andar} pois ele está lotado` });
        }
        // const lastApartmentFloor = (andar * 100) + building.qtd_apart_por_andar;
        // const numero = lastApartmentFloor - numberApartmentsOnFloor;

        const apartmentNumber = (andar * 100) + numberApartmentsOnFloor + 1;
        const apartmentExists = await Apartamento.findOne({ where: { edificioId: id, numero: apartmentNumber, andar } });
        if (apartmentExists) {
            return res.status(400).json({ message: "O apartamento já foi cadastrado" });
        }
        const apartment = await Apartamento.create({ numero: apartmentNumber, andar, valor_aluguel_mensal, edificioId: id });
        return res.status(201).json(apartment);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: `Ocorreu um erro ao cadastrar o apartamento: ${error.message}` });
    }
}

// async function cadastrarApartamento(req, res) {
//     try {
//       const { andar, valor_aluguel_mensal } = req.body;
//       const { id } = req.params;
//       const building = await Edificio.findByPk(id);
//       if (!building) {
//         return res.status(404).json({ message: "Edifício não encontrado" });
//       }
//       const numberApartmentsOnFloor = await Apartamento.count({
//         where: { edificioId: id, andar }
//       });
//       if (andar <= 0 || andar > building.qtd_andares) {
//         return res.status(400).json({ message: `O ${building.nome} tem apenas ${building.qtd_andares} andar e você está tentando inserir o apartamento em um andar que não existe` });
//         // throw new Error(`O número do andar do apartamento excede o número máximo de andares do edifício ${building.nome}`);
//       }
//       if (numberApartmentsOnFloor >= building.qtd_apart_por_andar) {
//         return res.status(400).json({ message: `Você não pode adicionar mais apartamentos no andar ${andar} pois ele está lotado` });
//       }
//       // Gera o número do apartamento de acordo com o andar
//       const lastApartmentFloor = (andar * 100) + building.qtd_apart_por_andar;
//       const numero = lastApartmentFloor - numberApartmentsOnFloor;
//       let apartment = await Apartamento.findOne({ where: { edificioId: id, numero } });
//       if (apartment) {
//         // Se o apartamento já foi cadastrado, atualize o registro existente em vez de criar um novo
//         apartment.andar = andar;
//         apartment.valor_aluguel_mensal = valor_aluguel_mensal;
//         apartment = await apartment.save();
//       } else {
//         // Se o apartamento ainda não foi cadastrado, crie um novo registro
//         apartment = await Apartamento.create({ numero, andar, valor_aluguel_mensal, edificioId: id });
//       }
//       return res.status(201).json(apartment);
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json({ message: `Ocorreu um erro ao cadastrar o apartamento: ${error.message}` });
//     }
//   }


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


// const deleteApartment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const apartment = await Apartamento.findByPk(id);
//         if (!apartment) {
//             res.status(404).json({ message: "O apartamento que você está tentando deletar não existe na base de dados" });
//         }
//         const { andar, numero } = apartment;
//         await Apartamento.destroy({ where: { id } });
//         const apartmentsToUpdate = await Apartamento.findAll({
//             where: {
//                 edificioId: apartment.edificioId,
//                 [Op.or]: [
//                     { andar: { [Op.gt]: andar } },
//                     { andar: andar, numero: { [Op.gt]: numero } }
//                 ]
//             }
//         });
//         for (const apt of apartmentsToUpdate) {
//             if (apt.andar === andar && apt.numero > numero) {
//                 apt.numero -= 1;
//             } else if (apt.andar > andar) {
//                 apt.numero -= 100;
//             }
//         }
//         await Apartamento.bulkCreate(apartmentsToUpdate, {
//             updateOnDuplicate: ["numero"]
//         });
//         return res.status(200).json({ message: "Apartamento excluído com sucesso" });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: `Ocorreu um erro ao deletar o apartamento: ${error.message}` });
//     }
// }

export default { getAllApartment, getAOneApartment, createApartment, uptadeApartment, deleteApartment }