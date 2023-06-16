import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import HeaderLogo from '../../assets/grab.png'


const StyledContainer = styled.div`
    flex-direction: row;
    background-color: #f9f9f9;
    position: sticky;
    top: 0;
    padding: 0.5rem 2rem 0.5rem 2rem;
    transition: background-color 0.5s;


    @media (min-height: 500px) {
      background-color: #f9f9f9b6;
    }
`

const Header = () => {
  return (
    <StyledContainer>
        <Image src={HeaderLogo} 
            alt='Logo'
            height={50}
            />

    </StyledContainer>
  )
}

export default Header