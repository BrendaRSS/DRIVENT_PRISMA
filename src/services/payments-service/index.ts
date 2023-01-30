import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import { Payment, Ticket, TicketType } from "@/protocols";

export async function getEnrollment(userId: number) {
  const result = await paymentsRepository.getEnrollment(userId);
  
  if(!result) {
    throw notFoundError();
  }
  
  return result.id;
}

export async function getTicket(enrollmentId: number) {
  const result = await paymentsRepository.getTicket(enrollmentId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

export async function postPayment(body: Payment, ticketId: number, ticketPrice: number) {
  await paymentsRepository.postPayment(body, ticketId, ticketPrice);
}

export async function getPayments(ticketId: number) {
  if(!ticketId) {
    throw notFoundError();
  }

  const result = await paymentsRepository.getPayments(ticketId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

export async function updateStatusTicket(ticketId: number): Promise<TicketType> {
  const result = await updateStatusTicket(ticketId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

const paymentsService = {
  getEnrollment,
  getTicket,
  postPayment,
  getPayments,
  updateStatusTicket
};
    
export default paymentsService;
