import {
  FaCamera,
  FaHandsHelping,
  FaMoneyCheck,
  FaUser,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";
import { BsBellFill, BsHeart, BsHouseFill, BsPen, BsPerson } from "react-icons/bs";
import { Construction, Work, WorkHistory, WorkOutlined } from "@mui/icons-material";

export const userNavLinkObject = [
  {
    name: "Blogs",
    icon: <BsHouseFill />,
    path: "/dashboard/author",
    userPrivilege: [-1],
  },
  {
    name: "Write",
    icon: <BsPen />,
    path: "/dashboard/editor",
    userPrivilege: [-1],
  },

  {
    name: "Home",
    icon: <BsHouseFill />,
    path: "/dashboard/home",
    userPrivilege: [0, 1, 3]
  },
  {
    name: "profile",
    icon: <BsPerson />,
    path: "/dashboard/profile",
    userPrivilege: [0, 1,]
  },
  {
    name: "Upload Image",
    icon: <FaCamera />,
    path: "/dashboard/upload-image",
    userPrivilege: [1,]
  },
  {
    name: "Notification",
    icon: <BsBellFill />,
    path: "/dashboard/notification",
    userPrivilege: [0, 1]
  }, {
    name: " Saved Service Provider",
    icon: < BsHeart />,
    path: "/dashboard/saved-artisan",
    userPrivilege: [0],
  },
  {
    name: "Bids",
    icon: < WorkOutlined />,
    path: "/dashboard/bids",
    userPrivilege: [1],
  },
  {
    name: "On going Jobs",
    icon: < Construction />,
    path: "/dashboard/ongoing-jobs",
    userPrivilege: [0, 1],
  },
  // {
  //   name: "Bids",
  //   icon: < WorkOutlined />,
  //   path: "/dashboard/bids",
  //   userPrivilege: [1],
  // },
  {
    name: " Create New Job",
    icon: < Work />,
    path: "/dashboard/create-offer",
    userPrivilege: [0],
  },
  {
    name: "Created Jobs",
    icon: < WorkHistory />,
    path: "/dashboard/job-record",
    userPrivilege: [0],
  },
  {
    name: "Users",
    icon: <FaUser />,
    path: "/dashboard/users",
    userPrivilege: [3]
  },
  {
    name: "Verify accounts",
    icon: <FaUserCheck />,
    path: "/dashboard/verify-user",
    userPrivilege: [3,]
  },
  {
    name: "Create admin",
    icon: <FaUserPlus />,
    path: "/dashboard/create-admin",
    userPrivilege: [3,]
  },
  {
    name: "Admins",
    icon: <FaUserCheck />,
    path: "/dashboard/verify-admins",
    userPrivilege: [3,]
  },
  {
    name: "Payments",
    icon: <FaMoneyCheck />,
    path: "/dashboard/payments",
    userPrivilege: [3,]
  },
  {
    name: "Requests",
    icon: <FaHandsHelping />,
    path: "/dashboard/requests",
    userPrivilege: [3,]
  },
];
