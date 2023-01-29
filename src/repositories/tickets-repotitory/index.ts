import { prisma } from "@/config";

async function find() {
  const ticket = prisma.ticketType.findMany();
  return ticket;
}

async function getEnrollmentId(userId: number) {
  const enrrolmentId = prisma.enrollment.findFirst({
    where: { userId },
  });

  return enrrolmentId;
}

async function findTicketsWithTypes(enrollmentId: number) {
  const ticketsWithTypes = prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId
    },
    include: {
      TicketType: true
    }
  });

  return ticketsWithTypes;
}

async function getTicketTypeId(ticketTypeId: number) {
  const ticketExist = prisma.ticketType.findFirst({
    where: { id: ticketTypeId  },
  });

  return ticketExist;
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  const ticket = prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: "RESERVED"
    },
  });

  return ticket;
}
  
const ticketsRepository = {
  find,
  findTicketsWithTypes,
  getEnrollmentId,
  getTicketTypeId,
  createTicket,
};
  
export default ticketsRepository;
