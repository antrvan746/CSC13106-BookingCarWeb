import Header from "@/components/Header";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import GrabBackground from "../../assets/grab_background.jpg";
import Navigator from "@/components/Navigator";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<div>
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

			


		</div>
	);
};

export default Home;
