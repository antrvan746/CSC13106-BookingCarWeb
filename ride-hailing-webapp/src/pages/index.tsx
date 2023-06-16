import Header from "@/components/Header";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import GrabBackground from "../../assets/grab_background.jpg";
import Navigator from "@/components/Navigator";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

const StyledPageContainer = styled.div``;

const StyledDriverRegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StyledTitle = styled.span`
	
`;

const Home: NextPage = () => {
  return (
    <StyledPageContainer>
      <Head>
        <title>Mai Grab</title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <Header />
      <Image
        src={GrabBackground}
        alt="Grab background"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
      />

      <Navigator text="Ho tro khach hang" backgroundColor="#0a7362" />
      <Navigator text="Tai ung dung" backgroundColor="#5ab38b" />

      <StyledDriverRegisterWrapper>
        <span> Đăng ký trở thành cộng tác viên với chúng tôi </span>
      </StyledDriverRegisterWrapper>
    </StyledPageContainer>
  );
};

export default Home;
