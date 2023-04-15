const yup = require("yup");

const edificioSchema = yup.object({
    nomeEdificio: yup.string()
        .min(2, "Insira no minimo 2 caracters no nome do Edificio")
        .max(40, "Insira no máximo 40 caracters no nome do Edificio")
        .required("O nome do edificio é obrigatório"),
    enderecoEdificio: yup.string()
        .min(5, "Insira no minimo 5 caracters no endereço")
        .required("O endereço do edificio é obrigatório"),
    qtdAndarEdificio: yup.number()
        .typeError("A quantidade de andar deve ser um número")
        .integer("Insira um número inteiro na quantidade de andar")
        .test("test-qtdApartPorAndar", "Insira um número positivo maior que zero na quantidade de andar", value => {
            return value > 0;
        })
        .required("A quantidade de andar é obrigatório"),
    qtdApartPorAndar: yup.number()
        .typeError("A quantidade de apartamento deve ser um número")
        .required("A quantidade de apartamento é obrigatário")
        .integer("Insira um número inteiro na quantidade de apartamento")
        .test("test-qtdApartPorAndar", "Insira um número positivo maior que zero na quantidade de apartamento", value => {
            return value > 0;
        }),
})

module.exports = edificioSchema;