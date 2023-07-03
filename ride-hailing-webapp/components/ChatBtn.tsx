import React from 'react'
import { IconButton, Button } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import styled from 'styled-components'


const StyledChatContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #f9f9f9;
    border-radius: 5px;
    z-index: 10;
`


const StyledText = styled.span`
    font-size: medium;
    color: #000000;
    margin-left: 1rem;
    margin-right: 0.5rem;
`

export const ChatBtn = () => {
  return (
    <StyledChatContainer>
        <Button>
            <ChatIcon style={{color: '#13745d'}} />

            <StyledText> Chat với admin tại đây </StyledText>

        </Button>

    </StyledChatContainer>
  )
}




export default ChatBtn