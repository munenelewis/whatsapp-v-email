import { auth, provider } from '../firebase'

import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from 'styled-components'

function Login() {
  const signIn = () => {
    console.log('====================================')
    console.log('gggggg')
    console.log('====================================')
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button onClick={signIn} variant="outlined">
          sign in with google
        </Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: whitesmoke;
`
const LoginContainer = styled.div`
padding:100px;
background:white;
  display: flex;
  flex-direction: column;
  border-color:black;
  border-radius:50px,
  box-shadow:0px 4px 14px -3px rgba(0,0,0.7)
`
const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`
