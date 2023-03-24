export interface IHeader {
  id: number;
  title: string;
  width?: number;
}
export const headersDT: IHeader[] = [
  {
    id: 1,
    title: "Name",
    width: 30,
  },
  {
    id: 2,
    title: "Email",
  },
  {
    id: 3,
    title: "Phone",
  },
  {
    id: 4,
    title: "Password",
  },
  {
    id: 5,
    title: "User Id",
  },
  {
    id: 6,
    title: "User Id",
  },
];

export interface IGridItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  userId: string;
}
export const itemData: IGridItem[] = [
  {
    id: 1,
    name: "Hello asdfasdfasdfasdfasdfasdfasdfasdf",
    email: "email@gmail.com",
    phone: "Sohel rana",
    password: "244739sk",
    userId: "asdf",
  },
  {
    id: 2,
    name: "Hello",
    email: "email@gmail.com",
    phone: "Sohel rana",
    password: "244739sk",
    userId: "asdf",
  },
  {
    id: 3,
    name: "Hello",
    email: "email@gmail.com",
    phone: "Sohel rana",
    password: "244739sk",
    userId: "asdf",
  },
  {
    id: 4,
    name: "Hello",
    email: "email@gmail.com",
    phone: "Sohel rana",
    password: "244739sk",
    userId: "asdf",
  },
];
