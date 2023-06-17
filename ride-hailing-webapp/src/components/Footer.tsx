import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem 0.5rem 2rem;
    background-color: #2f2f2c;
    min-height: 50px;
`

const StyledText = styled.span`
    font-size: medium;
    color: #ffffff;
`

const Footer = () => {
  return (
    <StyledContainer>
        <StyledText> Điều khoản và Chính sách </StyledText>

        <StyledText> @MaiDon </StyledText>

        <StyledText> Hotline: 024 7108 7108</StyledText>

    </StyledContainer>
  )
}

export default Footer