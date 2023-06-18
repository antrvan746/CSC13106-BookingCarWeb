import AdminHeader from "@/components/admin/AdminHeader";
import UserView from "@/components/admin/UserView";
import ListUser from "@/components/admin/ListUser";
import React from "react";
import styled from "styled-components";
import Head from "next/head";

const StyledPageContainer = styled.div``;

const StyledMainView = styled.div`
	display: grid;
	grid-template-columns: 2.5fr 1.5fr;
`;

const Customers = () => {
	return (
		<StyledPageContainer>
			<Head>
				<title>Mai Đón Admin - Quản lý khách hàng </title>
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

export default Customers;
