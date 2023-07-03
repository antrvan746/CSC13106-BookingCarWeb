import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import GrabBackground from "../../assets/about-background.png";

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

				<Image
					src={GrabBackground}
					alt="Grab background"
					sizes="100vw"
					style={{
						width: "100%",
						height: "auto",
					}}
				/>

				<StyledContentContainer>
					<StyledTitle> About us </StyledTitle>

					<StyledIntroductionParagraph>
						Mai Đón - là một dịch vụ đặt xe trực tuyến đa nền tảng,
						tiện lợi và đáng tin cậy, giúp đặt xe dễ dàng qua ứng
						dụng di động, cùng với đội ngũ tài xế chuyên nghiệp, đi
						kèm là các tiện ích bổ sung và dịch vụ chăm sóc khách
						hàng 24/7. Sứ mệnh của chúng tôi là mang lại trải nghiệm
						di chuyển mới mẻ cho khách hàng với Mai Đón.
					</StyledIntroductionParagraph>
				</StyledContentContainer>

				<StyledContentContainer>
					<StyledTitle> Members </StyledTitle>
				</StyledContentContainer>

				<Footer />
			</StyledPageContainer>
		</>
	);
};

export default About;
