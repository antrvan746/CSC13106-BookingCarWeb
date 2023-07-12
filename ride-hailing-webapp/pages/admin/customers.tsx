import AdminHeader from "../../components/admin/AdminHeader";
import UserView from "../../components/admin/UserView";
import ListUser from "../../components/admin/ListUser";
import React from "react";
import styled from "styled-components";
import Head from "next/head";
import withAuth from "../_withAuth";
import { Container } from "@mui/material";

const StyledPageContainer = styled.div`
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMainView = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr;
  max-width: 1500px;
`;

const Customers = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title>Mai Đón Admin - Quản lý khách hàng </title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <AdminHeader />

      <Container maxWidth="xl">
        <StyledMainView>
          <ListUser />
          <UserView />
        </StyledMainView>
      </Container>
    </StyledPageContainer>
  );
};

export default withAuth(Customers);
