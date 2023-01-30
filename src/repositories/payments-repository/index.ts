import { prisma } from "@/config";
import { Payment, Ticket } from "@/protocols";

async function getEnrollment(userId: number) {
  const enrrolmentId = await prisma.enrollment.findFirst({
    where: { userId },
  });
    
  return enrrolmentId;
}

async function getTicket(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {  
      enrollmentId: enrollmentId
    }
  });
}

async function postPayment(body: Payment, ticketId: number, ticketPrice: number) {
  await prisma.payment.create({
    data: {
      ticketId: ticketId,
      value: ticketPrice,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: body.cardData.number.slice(-4),
    }
  });
}

async function getPayments(id: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId: id,
    }
  });
}

async function updateStatusTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const paymentsRepository = {
  getEnrollment,
  getTicket,
  postPayment,
  getPayments,
  updateStatusTicket
};
    
export default paymentsRepository;
