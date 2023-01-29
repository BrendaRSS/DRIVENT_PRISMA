import { Router } from "express";
import { authenticateToken, validationTicketTypeId } from "@/middlewares";
import { getTicketsType, getTicketsWithTypes, postTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketsType);
ticketsRouter.get("/", getTicketsWithTypes);
ticketsRouter.post("/", validationTicketTypeId, postTickets);

export { ticketsRouter };
