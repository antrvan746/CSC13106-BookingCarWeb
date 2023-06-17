import AdminHeader from '@/components/admin/AdminHeader'
import LoginForm from '@/components/admin/LoginForm'
import React from 'react'
import styled from 'styled-components'

const StyledPageContainer = styled.div`
`

const AdminLogin = () => {

    const isLoggedIn = false;

  return (
    <StyledPageContainer>
        <AdminHeader isLoggedIn={isLoggedIn}/>
        <LoginForm />
    </StyledPageContainer>
  )
}

export default AdminLogin