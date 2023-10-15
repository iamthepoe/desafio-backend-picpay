import { Transaction } from "@prisma/client";

export class TransactionEntity implements Transaction {
  id: string;
  receiverId: string;
  senderId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
