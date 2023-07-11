import AdminHeader from "../../components/admin/AdminHeader";
import UserView from "../../components/admin/UserView";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import withAuth from "../_withAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseApp from "../../config/firebase";
import { getAuth } from "firebase/auth";

const StyledPageContainer = styled.div``;

const AdminHome = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title>Mai Đón Admin - Trang chủ </title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <AdminHeader />
    </StyledPageContainer>
  );
};

export default withAuth(AdminHome);
