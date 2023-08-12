import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import AdminHeader from "../components/admin/AdminHeader";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Mai Đón - Loading</title>
        <meta name="description" content="Created by NextJs" />
      </Head>


      <AdminHeader isLoggedIn={false} />

      <StyledContainer>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </StyledContainer>
    </>
  );
};

export default LoadingPage;
