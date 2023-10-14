import { User } from "@prisma/client";

export class UserEntity implements User {
  id: string;
  email: string;
  balance: number;
  document: string;
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
}
