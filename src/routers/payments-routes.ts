import { Router } from "express";
import { authenticateToken, validationPayment } from "@/middlewares";
import { getPayments, postPayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken);
paymentsRouter.get("/", getPayments);
paymentsRouter.post("/process", validationPayment, postPayments);

export { paymentsRouter };
