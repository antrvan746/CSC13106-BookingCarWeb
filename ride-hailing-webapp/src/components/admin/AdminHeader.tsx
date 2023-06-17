import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "../../../assets/grab.png";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const StyledContainer = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #1e1e1e;
	align-items: center;
	position: sticky;
	top: 0;
	padding: 0.5rem 2rem 0.5rem 2rem;
	transition: background-color 0.5s;
	min-height: 50px;

	@media (min-height: 110vh) {
		background-color: #1e1e1eb6;
	}
`;

interface AdminHeaderProps {
	isLoggedIn?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ isLoggedIn = true }) => {

	const MenuButton : React.FC<AdminHeaderProps> = ({isLoggedIn}) => {
		if (isLoggedIn) {
			return (
				<IconButton style={{
					margin: '0rem 1rem 0rem 0rem'
				}}>
					<MenuIcon style={{
						color: '#ffffff'
					}} />
				</IconButton>
			)
		} 
		return (
			<></>
		)
	}


	return (
		<StyledContainer>
			<MenuButton isLoggedIn={isLoggedIn} />
			<Link href="/admin/">
				<Image src={HeaderLogo} alt="Logo" height={40} />
			</Link>
		</StyledContainer>
	);
};

export default AdminHeader;
