import AdminHeader from "@/components/admin/AdminHeader";
import LoginForm from "@/components/admin/LoginForm";
import Head from "next/head";
import React from "react";
import styled from "styled-components";

const StyledPageContainer = styled.div``;

const AdminLogin = () => {
	return (
		<StyledPageContainer>
			<Head>
				<title>Mai Đón Admin - Đăng nhập </title>
				<meta name="description" content="Created by NextJs" />
			</Head>

			<AdminHeader isLoggedIn={false} />
			<LoginForm />
		</StyledPageContainer>
	);
};

export default AdminLogin;
