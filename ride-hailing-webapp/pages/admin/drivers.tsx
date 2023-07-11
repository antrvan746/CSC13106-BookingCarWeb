import AdminHeader from "../../components/admin/AdminHeader";
import ListUser from "../../components/admin/ListUser";
import UserView from "../../components/admin/UserView";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../_withAuth";

const StyledPageContainer = styled.div``;

const StyledMainView = styled.div`
	display: grid;
	grid-template-columns: 2.5fr 1.5fr;
`;

const Drivers = () => {
	return (
		<StyledPageContainer>
			<Head>
				<title>Mai Đón Admin - Quản lý tài xế </title>
				<meta name="description" content="Created by NextJs" />
			</Head>

			<AdminHeader />

			<StyledMainView>
				<ListUser />
				<UserView />
			</StyledMainView>
		</StyledPageContainer>
	);
};

export default withAuth(Drivers);
