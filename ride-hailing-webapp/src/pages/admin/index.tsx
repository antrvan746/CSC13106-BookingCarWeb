import AdminHeader from "@/components/admin/AdminHeader";
import React from "react";
import styled from "styled-components";

const StyledPageContainer = styled.div`
	min-height: 300vh;
`;

const AdminHome = () => {
	return (
		<StyledPageContainer>
			<AdminHeader />
		</StyledPageContainer>
	);
};

export default AdminHome;
