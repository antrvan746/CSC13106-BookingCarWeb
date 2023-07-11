import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import AdminHeader from "../components/admin/AdminHeader";

const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Mai Đón - Loading</title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <StyledPageContainer>
        <AdminHeader />

        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </StyledPageContainer>
    </>
  );
};

export default LoadingPage;
