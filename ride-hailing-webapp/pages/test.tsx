import Footer from "../components/Footer";
import Header from "../components/Header";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import GrabBackground from "../assets/about-background.png";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@mui/material";
import RideWs from "../libs/RideWs";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ws = useRef<RideWs>(new RideWs({}));
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    ws.current.client_listeners.onDriverFound = function (e) {
      setLoading(false);
      console.log(
        !e ? "Khong tim dc driver" : `Tim duoc driver ${e.driver_id}`
      );

      setTimeout(() => {
        setOpen(false);
      }, 3000);
    };

    return () => {
      ws.current.client_listeners.onDriverFound = undefined;
    };
  }, []);

  const handleSubscribe = () => {
    setLoading(true);
    ws.current.Connect({
      user_id: "admin_user",
      slon: 106.69380051915194,
      slat: 10.78825445546148,
      sadr: "LeVanTamPark",
      elat: 10.775111871794604,
      elon: 106.69234499244654,
      eadr: "TaoDangPark",
    });
  };

  return (
    <>
      <Head>
        <title>Mai Đón - About us</title>
        <meta name="description" content="Created by NextJs" />
      </Head>

      <StyledPageContainer>
        <Header />

        <div
          className="App"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            style={{ alignSelf: "center" }}
          >
            Open Dialog
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                // backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <DialogTitle> Đặt chuyến xe </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Chuyến đi của khách hàng hết 100.000VND
              </DialogContentText>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {loading ? (
                  <CircularProgress
                    style={{
                      marginTop: "1rem",
                      alignSelf: "center",
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleSubscribe}> Đặt xe </Button>
              <Button onClick={handleClose}> Huỷ </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Footer />
      </StyledPageContainer>
    </>
  );
};

export default About;
