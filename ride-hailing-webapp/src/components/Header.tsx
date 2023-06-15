import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import HeaderLogo from '../../assets/grab.png'


const StyledContainer = styled.div`
    flex-direction: row;
    background-color: #f9f9f9;
    padding: 0.5rem 0rem 0.5rem 2rem;
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