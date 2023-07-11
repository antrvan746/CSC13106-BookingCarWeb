import Head from "next/head";
import React from "react";
import styled from "styled-components";
import AdminHeader from "../../components/admin/AdminHeader";
import SignUpForm from "../../components/admin/SignUpForm";
import withAuth from "../_withAuth";

const StyledPageContainer = styled.div``;

const AdminSignUp = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title>Mai Đón Admin - Đăng nhập </title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <AdminHeader isLoggedIn={false} />
      <SignUpForm />
    </StyledPageContainer>
  );
};

export default AdminSignUp;
