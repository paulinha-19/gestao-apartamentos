import Locatario from "../models/locatario.js";

const getAllTenant = async (req, res) => {
    try {
        const tenant = await Locatario.findAll();
        res.status(200).json(tenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
    }
}


const createTenant = async (req, res) => {
    try {
        const { nome, email } = req.body;
        let nameTenantExists = await Locatario.findOne({ where: { nome } });
        let emailTenantExists = await Locatario.findOne({ where: { email } });
        if (!nameTenantExists && !emailTenantExists) {
            const newTenant = await Locatario.create({
                nome,
                email
            },
                {
                    fields: ['nome', 'email']
                });
            return res.status(201).json(newTenant);
        }
        return res.status(400).json({
            message: `O nome e email devem ser unico!`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao criar locatário. ${error.message}` });
    }
}

export default { getAllTenant, createTenant };