import AdminHeader from '@/components/admin/AdminHeader';
import BookingForm from '@/components/admin/BookingForm';
import MapComponent from '@/components/admin/MapComponent';
import Head from 'next/head';
import React from 'react'
import styled from 'styled-components'

const StyledPageContainer = styled.div`
`;

const StyledContentContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
`;

const StyledDividedContainer = styled.div`
  width: 100%;
`;

const RideDetailView = () => {
  return (
    <StyledPageContainer>
      <Head> 
        <title> Mai Đón Admin - Đặt xe cho khách hàng </title>
        <meta name="description" content="Created by NextJs" />
      </Head>
      <AdminHeader />
      <StyledContentContainer>
        <MapComponent />

        <StyledDividedContainer>
          <BookingForm />
        </StyledDividedContainer>
      </StyledContentContainer>
    </StyledPageContainer>
  )
}

export default RideDetailView