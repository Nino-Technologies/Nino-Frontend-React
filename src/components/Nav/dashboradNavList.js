import {
  // BsAward,
  BsBellFill,
  BsHouseFill,
  BsPerson,
} from "react-icons/bs";

export const userNavLinkObject = [
  {
    name: "Home",
    icon: <BsHouseFill />,
    path: "/dashboard/home",
    userPrivilege: 1,
  },
  {
    name: "profile",
    icon: <BsPerson />,
    path: "/dashboard/profile",
    userPrivilege: 1,
  },
  {
    name: "Notification",
    icon: <BsBellFill />,
    path: "/dashboard/notification",
    userPrivilege: 1,
  },
];
