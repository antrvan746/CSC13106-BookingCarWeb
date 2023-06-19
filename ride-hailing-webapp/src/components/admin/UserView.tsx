import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f9f9f9;
	border-radius: 5px;
	margin: 3rem 2rem 2rem 0.5rem;
`;

const StyledText = styled.span`
	font-weight: bold;
	font-size: large;
	margin-top: 10px;
`;

const StyledUserName = styled.span`
	font-weight: normal;
	font-size: medium;
`;

const UserView = () => {
	return (
		<StyledContainer>
			<StyledText> Thông tin khách hàng </StyledText>

			<Avatar sx={{ width: 100, height: 100, margin: "1rem" }} />

			<StyledUserName> Tên tài khoản </StyledUserName>
		</StyledContainer>
	);
};

export default UserView;
