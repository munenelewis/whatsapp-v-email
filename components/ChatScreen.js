import { Avatar, IconButton } from '@material-ui/core'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { auth } from '../firebase'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

function ChatScreen() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Rec Email</h3>
          <p>last seen ... </p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon></AttachFileIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
    </Container>
  )
}

export default ChatScreen
const Container = styled.div``
const Header = styled.div``

const HeaderInformation = styled.div``
const HeaderIcons = styled.div``
