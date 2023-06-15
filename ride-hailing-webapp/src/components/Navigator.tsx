import React from "react";
import styled from "styled-components";

interface HomeNavigationProps {
	text: string;
	backgroundColor: string;
}

const StyledContainer = styled.div`
	height: 50px;
	padding: 0.25rem 0rem 0.25rem 2rem;
	display: flex;
	align-items: center;
`;

const StyledText = styled.span`
	font-weight: bold;
	font-size: large;
	color: #ffffff;
`;

const Navigator: React.FC<HomeNavigationProps> = ({
	text,
	backgroundColor,
}) => {
	return (
		<StyledContainer style={{ backgroundColor }}>
			<StyledText>{text}</StyledText>
		</StyledContainer>
	);
};

export default Navigator;
