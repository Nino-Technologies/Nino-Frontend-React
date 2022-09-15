import { FaCamera, FaUser, FaUserCheck, FaUserPlus } from "react-icons/fa";
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
    userPrivilege: 0,
  },
  {
    name: "profile",
    icon: <BsPerson />,
    path: "/dashboard/profile",
    userPrivilege: 0,
  },
  {
    name: "Upload Image",
    icon: <FaCamera />,
    path: "/dashboard/upload-image",
    userPrivilege: 1,
  },
  {
    name: "Notification",
    icon: <BsBellFill />,
    path: "/dashboard/notification",
    userPrivilege: 0,
  },
  {
    name: "Users",
    icon: <FaUser />,
    path: "/dashboard/users",
    userPrivilege: 3,
  },
  {
    name: "Verify accounts",
    icon: <FaUserCheck />,
    path: "/dashboard/verify-user",
    userPrivilege: 3,
  },
  {
    name: "Create admin",
    icon: <FaUserPlus />,
    path: "/dashboard/create-admin",
    userPrivilege: 3,
  },
];
