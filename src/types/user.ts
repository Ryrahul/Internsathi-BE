export type Signup = {
  email: string;
  password: string;
  name: string;
};

export type Login = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
