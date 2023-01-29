import { Request, Response, NextFunction } from "express";
import { ticketTypeIdSchema } from "@/schemas";
import httpStatus from "http-status";

export async function validationTicketTypeId(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const { error } = ticketTypeIdSchema.validate(body, { abortEarly: false });
  
  if(error) {
    const errors = error.details.map(( d ) => d.message);
    return res.status(httpStatus.BAD_REQUEST).send(errors);
  }

  req.body =  body;
  next();
}
