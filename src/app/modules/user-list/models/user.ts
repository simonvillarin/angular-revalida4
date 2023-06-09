export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  username: string;
  password?: string;
  role: string;
  status: boolean;
}
