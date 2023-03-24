import { AiOutlineHome, AiOutlineYoutube } from "react-icons/ai";
import { BiChat, BiDonateBlood } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
export const routes = [
  {
    id: 1,
    name: "Home",
    icon: (size, color) => <AiOutlineHome color={color} fontSize={size} />,
    path: "/",
  },
  {
    id: 1,
    name: "Videos",
    icon: (size, color) => <AiOutlineYoutube color={color} fontSize={size} />,
    path: "/",
  },
  {
    id: 1,
    name: "Chat",
    icon: (size, color) => <BiChat color={color} fontSize={size} />,
    path: "/chat",
  },
  {
    id: 1,
    name: "Donation",
    icon: (size, color) => <BiDonateBlood color={color} fontSize={size} />,
    path: "/donor",
  },
  {
    id: 1,
    name: "Find Friends",
    icon: (size, color) => <FaUserFriends color={color} fontSize={size} />,
    path: "/",
  },
  {
    id: 1,
    name: "Profile",
    icon: (size, color) => <CgProfile color={color} fontSize={size} />,
    path: "/profile",
  },
];
