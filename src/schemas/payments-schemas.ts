import Joi from "joi";

export const paymentsSchema = Joi.object({ 
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string(),
    cvv: Joi.string().required()
  }
});

