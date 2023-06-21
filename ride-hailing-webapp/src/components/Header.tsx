import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "../../assets/grab.png";

const StyledContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	background-color: #f9f9f9;
	position: sticky;
	top: 0;
	padding: 0.5rem 2rem 0.5rem 2rem;
	transition: background-color 0.5s;
	min-height: 50px;

	@media (min-height: 110vh) {
		background-color: #f9f9f9b6;
	}
`;

const Header = () => {
	return (
		<StyledContainer>
			<Link href="/">
				<Image src={HeaderLogo} alt="Logo" height={40} />
			</Link>
		</StyledContainer>
	);
};

export default Header;
