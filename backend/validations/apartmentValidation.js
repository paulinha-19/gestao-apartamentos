const yup = require("yup");

const apartmentValidation = yup.object({
    nomeEdificio: yup.string()
        .required("O nome do edifício é obrigatório"),
    andarApartamento: yup.number()
        .required('O andar do apartamento é obrigatório'),
    numeroApartamento: yup.number()
        .required('O número do apartamento é obrigatório')
})

module.exports = apartmentValidation;