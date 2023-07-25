import AdminHeader from "../../components/admin/AdminHeader";
import DriversView from "../../components/admin/DriversView";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../_withAuth";
import { Container } from "@mui/material";

const StyledPageContainer = styled.div``;



const Drivers = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title>Mai Đón Admin - Quản lý tài xế </title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <AdminHeader />

      <Container maxWidth="xl">
        <DriversView />
      </Container>
    </StyledPageContainer>
  );
};

export default withAuth(Drivers);
