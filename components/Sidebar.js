import * as EmailValidator from 'email-validator'

import { Avatar, Button, IconButton } from '@material-ui/core'
import { auth, db } from '../firebase'

import Chat from '../components/Chat'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

function Sidebar() {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user?.email)
  const [chatsSnapshot] = useCollection(userChatRef)

  const createChat = () => {
    const input = prompt('enter an email address')
    if (!input) {
      return null
    }

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      })
    }
  }

  const chatAlreadyExists = (recipentEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipentEmail)?.length > 0,
    )

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SideBarButton onClick={createChat}>Start a new chat </SideBarButton>

      {/* list of chat */}
      {chatsSnapshot?.docs.map((chat) => {
        return <Chat id={chat.id} key={chat.id} users={chat.data().users} />
      })}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
`

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 2px;
`

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

const SideBarButton = styled(Button)`
    width:100%;
    &&&(
        border-bottom: 1px solid whitesmoke
    border-top: 1px solid whitesmoke
    )

`
