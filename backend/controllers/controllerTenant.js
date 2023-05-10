const { Locatario, Apartamento } = require("../models");

const getAllTenant = async (req, res) => {
    try {
        const tenant = await Locatario.findAll();
        res.status(200).json(tenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Ocorreu um erro ao buscar os locatários: ${error.message}` });
    }
}

const createTenant = async (req, res) => {
    try {
        const { nomeLocatario, emailLocatario, telefoneLocatario } = req.body;
        let phoneTenantExists = await Locatario.findOne({ where: { telefoneLocatario } });
        let emailTenantExists = await Locatario.findOne({ where: { emailLocatario } });
        if (!phoneTenantExists && !emailTenantExists) {
            const newTenant = await Locatario.create({
                nomeLocatario,
                emailLocatario,
                telefoneLocatario
            });
            return res.status(201).json(newTenant);
        }
        return res.status(400).json({
            message: `O email ou telefone do locatario já existem!`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao criar locatário. ${error.message}` });
    }
}

export default { getAllTenant, createTenant };