import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repotitory";

export async function getTicketsType() {
  const result = await ticketsRepository.find();

  if (!result) {
    throw notFoundError();
  }

  return result;
}

export async function getEnrollmentId(userId: number) {
  const result = await ticketsRepository.getEnrollmentId(userId);

  if(!result) {
    throw notFoundError();
  }

  return result.id;
}

export async function getTicketsWithTypes(enrollmentId: number) {
  const result = await ticketsRepository.findTicketsWithTypes(enrollmentId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

export async function getTicketTypeId(ticketTypeId: number) {
  const result = await ticketsRepository.getTicketTypeId(ticketTypeId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

export async function postTicket(enrollmentId: number, ticketTypeId: number) {
  const result = await ticketsRepository.createTicket(enrollmentId, ticketTypeId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

const ticketsService = {
  getTicketsType,
  getTicketsWithTypes,
  getEnrollmentId,
  getTicketTypeId,
  postTicket,
};
  
export default ticketsService;
