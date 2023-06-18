import AdminHeader from "@/components/admin/AdminHeader";
import UserView from "@/components/admin/UserView";
import React from "react";
import styled from "styled-components";

const StyledPageContainer = styled.div`
	min-height: 300vh;
`;

const AdminHome = () => {
	return (
		<StyledPageContainer>
			<AdminHeader />

			<UserView/>

		</StyledPageContainer>
	);
};

export default AdminHome;
