import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";

export async function getPayments(req: Request, res: Response) {
  const { ticketId } = req.query;

  try{
    const payments = await paymentsService.getPayments(Number(ticketId));
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
            
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body;

  try {
    const enrollment = await paymentsService.getEnrollment(Number(userId));
    const ticketsWithTypes = await ticketsService.getTicketsWithTypes(enrollment);

    await paymentsService.postPayment(body, ticketsWithTypes.id, ticketsWithTypes.TicketType.price);

    const payment = await paymentsService.getPayments(body.ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
      
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
