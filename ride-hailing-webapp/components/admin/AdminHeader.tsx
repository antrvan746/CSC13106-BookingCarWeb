import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import HeaderLogo from "../../assets/mai-don.png";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSignOut } from "react-firebase-hooks/auth";
import FirebaseApp from "../../config/firebase";
import { getAuth } from "firebase/auth";

const WhiteHomeIcon = styled(HomeIcon)`
  color: #ffffff;
  width: 40;
`;

const CustomerIcon = styled(PeopleAltIcon)`
  color: #ffffff;
  width: 40;
`;

const DriversIcon = styled(PeopleAltIcon)`
  color: #13b45d;
  width: 40;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #1e1e1e;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  transition: background-color 0.5s;
  min-height: 50px;
  transition: background-color 0.5s;
`;

interface AdminHeaderProps {
  isLoggedIn?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
}

const app = FirebaseApp;
const auth = getAuth();

const AdminHeader: React.FC<AdminHeaderProps> = ({ isLoggedIn = true }) => {
  const [isOpen, setOpen] = useState(false);

  const [signOut, _loading, _error] = useSignOut(auth);

  const listNavigation = [
    { name: "Dashboard", icon: <WhiteHomeIcon />, link: "/admin/" },
    { name: "Customers", icon: <CustomerIcon />, link: "/admin/customers" },
    { name: "Drivers", icon: <DriversIcon />, link: "/admin/drivers" },
  ];

  return (
    <div>
      <StyledContainer>
        {isLoggedIn ? (
          <IconButton
            style={{
              margin: "0rem 1rem 0rem 0rem",
            }}
            onClick={() => setOpen(!isOpen)}
          >
            <MenuIcon
              style={{
                color: "#ffffff",
              }}
            />
          </IconButton>
        ) : (
          <></>
        )}
        <Link href="/admin/">
          <Image src={HeaderLogo} alt="Logo" height={40} />
        </Link>
        {isLoggedIn ? (
          <IconButton
            style={{
              marginLeft: "auto",
            }}
            onClick={signOut}
          >
            <LogoutIcon
              style={{
                color: "#ffffff",
              }}
            />
          </IconButton>
        ) : (
          <></>
        )}
      </StyledContainer>
      {isOpen ? (
        <div
          style={{
            width: 250,
            backgroundColor: "#1e1e1e",
            height: "300vh",
            position: "absolute",
            zIndex: 10,
          }}
          onClick={() => setOpen(false)}
        >
          {listNavigation.map((item, index) => (
            <ListItem
              key={index}
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingLeft: "0.5rem",
              }}
              disablePadding
            >
              <ListItemIcon style={{ padding: "8px 0px 8px 8px" }}>
                {item.icon}
              </ListItemIcon>
              <Link
                href={item.link}
                style={{
                  color: "#ffffff",
                  padding: "8px 0px 8px 0px",
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminHeader;
