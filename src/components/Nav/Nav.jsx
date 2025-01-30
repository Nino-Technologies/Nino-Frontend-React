import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.scss";
import navImage from "../../assets/images/grinders.png";
import { BsHouse } from "react-icons/bs";
import { UserContext } from "../../context/UserContext.jsx";
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
  // BsCaretDownFill,
  BsFillDoorOpenFill,
  // BsHouse,
} from "react-icons/bs";
import { userNavLinkObject } from "./dashboradNavList.js";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  // Typography,
} from "@mui/material";
import { Settings, KeyboardArrowDownOutlined } from "@mui/icons-material";
// import { styled } from "@material-ui/styles";
import { styled } from '@mui/system'; // for MUI v5 and above

// import { styled, alpha } from "@material-ui/styles";
import { useCookies } from "react-cookie";

const navLinks = [
  {
    name: "Home",
    link: "/home",
  },
  {
    name: "Service Providers",
    link: "/artisans",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
];

function Nav() {
  const { loggedIn } = useContext(UserContext);
  return (
    <div className="Nav">
      {" "}
      <input
        type="checkbox"
        name=""
        id="menu-toggle"
        style={{ display: "none" }}
      />
      <div className="logo">
        <Link to="/">
          <img src={navImage} alt="working-man" className="logo" />
        </Link>
        <label htmlFor="menu-toggle" className="menu-button"></label>
      </div>
      <div className="link-container d-flex">
        {navLinks.map((link, index) => {
          return (
            <NavLink
              to={link.link}
              className={({ isActive }) => (isActive ? "active" : "")}
              key={index}
            >
              {link.name}
            </NavLink>
          );
        })}
        {loggedIn ? <AccountMenu /> : <CustomizedMenus />}
      </div>
    </div>
  );
}

export default Nav;

export const DashboardSideNav = ({ sideNavOpen, setSideNavOpen }) => {
  const { userProfile } = useContext(UserContext);
  function navToggle() {
    setSideNavOpen(!sideNavOpen);
  }
  const { logOutFunction } = useContext(UserContext);
  const { role } = userProfile;

  useEffect(() => { console.log({ role }) }, [role]);
  // console.log(userProfile);
  return (
    <>
      <div
        className="
        
        side-nav-icon toggle"
        onClick={() => {
          navToggle();
        }}
      >
        {sideNavOpen ? <BsArrowLeftSquareFill /> : <BsArrowRightSquareFill />}
      </div>
      <ul>
        {userNavLinkObject
          .filter(({ userPrivilege }) => role === 3 || userPrivilege.includes(role))
          .map(({ name, icon, path }, i) => {
            return (
              <li key={i}>
                <NavLink to={path} className={({ isActive }) => (isActive ? "active-nav-item" : "")}>
                  <div className="side-nav-icon">{icon}</div>
                  <span className="nav-link-name">{name}</span>
                </NavLink>
              </li>
            );
          })}

        <li
          onClick={() => {
            logOutFunction();
          }}
        >
          <div className="side-nav-icon text-danger">
            {" "}
            <BsFillDoorOpenFill />
          </div>
          <span className="nav-link-name text-danger">LogOut</span>
        </li>
      </ul>
    </>
  );
};


export function AccountMenu() {
  const { loggedIn, logOutFunction, getUserProfile, userProfile } = useContext(UserContext);
  const [cookies] = useCookies();
  const [anchorEl, setAnchorEl] = useState(null);
  // const isOpen = Boolean(anchorEl);

  // Fetch user profile if logged in and cookie is present
  useEffect(() => {
    if (loggedIn && cookies.grinderUser) {
      getUserProfile();
    }
  }, [loggedIn, cookies.grinderUser, getUserProfile]);

  // Handlers with useCallback for memoization
  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt={userProfile?.fullName || "User"}
              src={userProfile?.avatar || null} // Fallback avatar
            />
            <KeyboardArrowDownOutlined />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={anchorEl}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/dashboard/home" style={{ textDecoration: "none", color: "inherit" }}>
          <MenuItem>
            <ListItemIcon>
              <BsHouse fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={logOutFunction}>
          <ListItemIcon>
            <  BsFillDoorOpenFill fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    // marginTop: theme.spacing(1),
    minWidth: 180,
    // color:
    //   theme.palette.mode === "light"
    //     ? "rgb(55, 65, 81)"
    //     : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        // marginRight: theme.spacing(1.5),
      },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
  },
}));

export function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorLink, setAnchorLink] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // console.log(event);
    setAnchorEl(event.currentTarget);
    if (event.currentTarget.id === "login-button") {
      return setAnchorLink("login");
    }
    setAnchorLink("register");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="login-button"
        aria-controls={open ? "login-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        // disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownOutlined />}
        className="mx-1 secondary-color"
      >
        Login
      </Button>

      <Button
        id="sign-in-button"
        aria-controls={open ? "sign-in-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownOutlined />}
        className="mx-1 secondary-color"
      >
        Sign Up
      </Button>
      <StyledMenu
        id="sign-in-menu"
        MenuListProps={{
          "aria-labelledby": "sign-in-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link className="drop-down-link" to={`/${anchorLink}?as=user`}>
          <MenuItem onClick={handleClose} disableRipple>
            {/* <EditIcon /> */}
            Users
          </MenuItem>
        </Link>
        <Link className="drop-down-link" to={`/${anchorLink}?as=artisan`}>
          <MenuItem onClick={handleClose} disableRipple>
            {/* <EditIcon /> */}
            Service Provider
          </MenuItem>
        </Link>
      </StyledMenu>
      {/* <StyledMenu
        id="login-menu"
        MenuListProps={{
          "aria-labelledby": "login-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link to="/login?as=user">
          <MenuItem onClick={handleClose} disableRipple>
            Users
          </MenuItem>
        </Link>
        <Link to="/login?as=artisan">
          <MenuItem onClick={handleClose} disableRipple>
            Service Provider
          </MenuItem>
        </Link>
      </StyledMenu> */}
    </div>
  );
}