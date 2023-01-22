export interface IGetUserProps {
  page: number;
  limit: number;
}

export interface IUserStatusSocketRes {
  receivers: string;
  userId: string;
  online: boolean;
  lastActive: string;
}
