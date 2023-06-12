export interface User {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate: Date;
  listOfInterest: string[];
  email: string;
  phoneNumber: number;
  username: string;
  password: string;
  role: string;
  status: boolean;
}
