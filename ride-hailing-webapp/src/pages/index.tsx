import Header from "@/components/Header";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Navigator from "@/components/Navigator";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

import GrabBackground from "../../assets/grab_background.jpg";
import GrabHiringGraphic from "../../assets/grab-driver-graphic.png";
import CHPlayStoreIcon from "../../assets/google-play-logo.svg";
import AppStoreIcon from "../../assets/app-store-logo.svg";
import Footer from "@/components/Footer";
import ChatBtn from "@/components/ChatBtn";

const StyledPageContainer = styled.div`
`;

const StyledContentWrapper = styled.div`
	padding-left: 2rem;
	padding-right: 2rem;
	display: grid;
	margin-top: 3rem;
	margin-bottom: 2rem;
`;

const StyledTitle = styled.h2`
	font-size: x-large;
	font-weight: bold;
	margin-bottom: 2rem;
`;

const StyledDownloadAppSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 300px;
	margin: 3rem;
`;

const StyledDownloadAppComponent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const StyledStoreNameText = styled.span`
	font-size: larger;
	padding-left: 2rem;
`;

const StyledGraphicContainer = styled.div``;

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Mai Đón - Home</title>
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

				<ChatBtn />

				<Navigator text="Hỗ trợ khách hàng" backgroundColor="#0a7362" />
				<Navigator text="Tải ứng dụng" backgroundColor="#5ab38b" />

				<StyledContentWrapper>
					<StyledTitle>
						Đăng ký trở thành cộng tác viên với chúng tôi
					</StyledTitle>

					<StyledGraphicContainer>
						<Link href="/">
							<Image
								src={GrabHiringGraphic}
								alt="Grab hiring graphic"
								style={{
									height: "auto",
									width: "100%",
									borderRadius: "0.5rem",
								}}
							/>
						</Link>
					</StyledGraphicContainer>
				</StyledContentWrapper>

				<StyledContentWrapper>
					<StyledTitle>Cài đặt ứng dụng</StyledTitle>

					<StyledDownloadAppSection>
						<StyledDownloadAppComponent>
							<StyledGraphicContainer>
								<Link href="/">
									<Image
										src={CHPlayStoreIcon}
										alt="CHPlay store logo"
										height={80}
									/>
								</Link>
							</StyledGraphicContainer>

							<StyledStoreNameText>
								Tải ứng dụng ngay tại CH Play
							</StyledStoreNameText>
						</StyledDownloadAppComponent>

						<StyledDownloadAppComponent>
							<StyledGraphicContainer>
								<Link href="/">
									<Image
										src={AppStoreIcon}
										alt="Appstore logo"
										height={80}
									/>
								</Link>
							</StyledGraphicContainer>

							<StyledStoreNameText>
								Tải ứng dụng ngay tại App Store
							</StyledStoreNameText>
						</StyledDownloadAppComponent>
					</StyledDownloadAppSection>


				</StyledContentWrapper>

				<Footer />
			</StyledPageContainer>
		</>
	);
};

export default Home;
