import AdminHeader from "@/components/admin/AdminHeader";
import LoginForm from "@/components/admin/LoginForm";
import React from "react";
import styled from "styled-components";

const StyledPageContainer = styled.div``;

const AdminLogin = () => {
	return (
		<StyledPageContainer>
			<AdminHeader isLoggedIn={false} />
			<LoginForm />
		</StyledPageContainer>
	);
};

export default AdminLogin;
