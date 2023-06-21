import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; 
`

const StyledLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BookingForm = () => {
  return (
    <StyledContainer>
        <StyledLeftContainer>

        </StyledLeftContainer>


    </StyledContainer>
  )
}

export default BookingForm