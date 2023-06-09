export interface User {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthdate: Date;
  listOfInterest: string[];
  // house: string;
  // building: string;
  // street: string;
  // city: string;
  // province: string;
  // zipcode: string;
  email: string;
  username: string;
  password: string;
  role: string;
  status: boolean;
}
