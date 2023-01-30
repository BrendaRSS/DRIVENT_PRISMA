import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import ticketsService from "@/services/tickets-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  try{
    const enrollment = await paymentsService.getEnrollment(Number(userId));
    const ticket = await paymentsService.getTicketPost(Number(ticketId), enrollment);
    const payments = await paymentsService.getPayments(Number(ticketId));
    return res.status(httpStatus.OK).send(payments);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } 
            
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body;

  try {
    const enrollment = await paymentsService.getEnrollment(Number(userId));
    const ticket = await paymentsService.getTicketPost(body.ticketId, enrollment);
    const ticketsWithTypes = await ticketsService.getTicketsWithTypes(enrollment);

    await paymentsService.updateStatusTicket(ticketsWithTypes.id);

    await paymentsService.postPayment(body, ticketsWithTypes.id, ticketsWithTypes.TicketType.price);

    const payment = await paymentsService.getPayments(body.ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }  
      
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
