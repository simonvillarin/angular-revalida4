export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate: string;
  listOfInterest: string[];
  house: string;
  building: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipcode: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  role: string;
  status: boolean;
}
