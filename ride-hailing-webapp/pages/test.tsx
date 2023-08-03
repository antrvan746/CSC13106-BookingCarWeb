import Footer from "../components/Footer";
import Header from "../components/Header";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import GrabBackground from "../assets/about-background.png";

const StyledPageContainer = styled.div``;

const StyledContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 10rem;
	padding-right: 10rem;
`;

const StyledTitle = styled.h1`
	color: #000000;
`;

const StyledIntroductionParagraph = styled.p`
	font-weight: normal;
	font-size: larger;
`;

const About: NextPage = () => {
	return (
		<>
			<Head>
				<title>Mai Đón - About us</title>
				<meta name="description" content="Created by NextJs" />
			</Head>

			<StyledPageContainer>
				<Header />


				<Footer />
			</StyledPageContainer>
		</>
	);
};

export default About;
