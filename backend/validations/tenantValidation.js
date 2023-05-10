const yup = require("yup");

const tenantSchema = yup.object({
    nomeLocatario: yup.string()
        .min(3, "Insira no minimo 2 caracters no nome do locatário")
        .max(50, "Insira no máximo 40 caracters no nome do locatário")
        .required("O nome do locatário é obrigatório"),
    emailLocatario: yup.string()
        .email("Email inválido")
        .required("O email do locatário é obrigatório"),
    telefoneLocatario: yup.number()
        .matches(/^[0-9]{2}9[0-9]{8}$/, "O formato do telefone deve ter o formato 11981816630. DDD 9 seguido do numero do telefone")
        .typeError("O telefone deve ser um número")
        .integer("Insira um número inteiro no número do telefone")
        .required("O telefone é obrigatório")
})

module.exports = tenantSchema;