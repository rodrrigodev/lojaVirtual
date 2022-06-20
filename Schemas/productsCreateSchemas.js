const Joi = require('joi')

const createProductSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty':'O nome precisa ser preenchido!',
        'string.min':'O nome precisa ter no minimo 3 caracteres!'
    }),
    price: Joi.number().min(1).required().messages({
        'number.empty':'O preço precisa ser preenchido!',
        'number.min':'O preço precisa ser maior que 0!',
        'number.base':'O preço precisa ser um numero!'}),
    discount: Joi.number().required().messages({
        'number.empty':'O desconto precisa ser preenchido!'}),
    category: Joi.string().required().regex(/in-sale|visited/).messages({
        'string.empty':'A categoria precisa ser selecionada!'}), //OBS: regex diz que só aceitara caso o user determine uma das 2 opcoes
    description: Joi.string().max(100).required()
})



module.exports = createProductSchema