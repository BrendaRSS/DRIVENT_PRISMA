import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getPayments(req: Request, res: Response) {
  return res.status(httpStatus.OK).send("ok");
}

export async function postPayments(req: Request, res: Response) {
  return res.status(httpStatus.OK).send("ok");
}
