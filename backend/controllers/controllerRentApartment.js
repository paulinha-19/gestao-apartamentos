// import Apartamento from "../models/apartamento.js";
// import Locacao from "../models/locacao.js";
// import Locatario from "../models/locatario.js";

// const createRentApartment = async (req, res) => {
//     try {
//         const { apartamentoId, locatarioId } = req.params;
//         const { data_inicio_locacao, data_fim_locacao } = req.body;
//         const apartment = await Apartamento.findByPk(apartamentoId);
//         if (!apartment) {
//             return res.status(400).json({ message: 'Apartamento não encontrado' });
//         }
//         if (!apartment.disponivel) {
//             return res.status(400).json({ message: 'Apartamento não disponível para locação' });
//         }
//         const tenant = await Locatario.findByPk(locatarioId);
//         if (!tenant) {
//             return res.status(404).json({ message: 'Locatário não encontrado' });
//         }
//         if (!apartment.disponivel) {
//             return res.status(400).json({ message: 'Apartamento não está disponível para locação' });
//         }
//         const rent = await Locacao.create({
//             data_inicio_locacao, //new Date(),
//             data_fim_locacao, //new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//             apartamentoId,
//             locatarioId,
//         });
//         apartment.disponivel = false;
//         await rent.update();
//         return res.status(201).json({ message: 'Apartamento alugado com sucesso', rent });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Erro ao criar locação' });
//     }
// }

// ALUGUEÇ

// const getAllBuildingName = async (req, res) => {
//   try {
//     const buildings = await Edificio.findAll({
//       attributes: ['id', 'nomeEdificio'],
//       include: [
//         {
//           model: Apartamento,
//           where: { disponivelApartamento: true },
//           required: false
//         }
//       ],
//       order: [
//         ['nomeEdificio', 'ASC'],
//       ]
//     });

//     const filteredBuildings = buildings.filter(building => {
//       const hasAvailableApartments = building.Apartamentos.some(apartment => apartment.disponivelApartamento);
//       return hasAvailableApartments;
//     });

//     if (filteredBuildings.length === 0) {
//       return res.status(404).json({ message: 'Nenhum nome encontrado' });
//     }

//     const buildingNames = filteredBuildings.map(building => {
//       return { id: building.id, nomeEdificio: building.nomeEdificio };
//     });

//     return res.status(200).json(buildingNames);
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
//   }
// }


// export default createRentApartment