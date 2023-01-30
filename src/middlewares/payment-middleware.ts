import { Request, Response, NextFunction } from "express";
import { paymentsSchema } from "@/schemas";
import httpStatus from "http-status";

export async function validationPayment(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const { error } = paymentsSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors = error.details.map((d) => d.message);
    return res.status(httpStatus.BAD_REQUEST).send(errors);
  }

  req.body =  body;
  next();
}
