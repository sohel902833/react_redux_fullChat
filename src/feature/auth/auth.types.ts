export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: {
    fileName: string;
    url: string;
  };
  cover: {
    fileName: string;
    url: string;
  };
  birthdate: string;
  verified: boolean;
  phone: string;
  online?: boolean;
  lastActive?: string;
  _id: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
  message: string;
}
