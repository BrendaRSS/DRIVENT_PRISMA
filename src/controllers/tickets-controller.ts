import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService  from "@/services/tickets-service";

export async function getTicketsType(req: Request, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketsType();
    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicketsWithTypes(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try{
    const enrollmentId = await ticketsService.getEnrollmentId(userId);
   
    const ticketsWithTypes = await ticketsService.getTicketsWithTypes(enrollmentId);
  
    return res.status(httpStatus.OK).send(ticketsWithTypes);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const enrollmentId = await ticketsService.getEnrollmentId(userId);

    const verifyTicketType = await ticketsService.getTicketTypeId(ticketTypeId);

    await ticketsService.postTicket(enrollmentId, verifyTicketType.id);

    const ticketsWithTypes = await ticketsService.getTicketsWithTypes(enrollmentId);

    return res.status(httpStatus.CREATED).send(ticketsWithTypes);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
