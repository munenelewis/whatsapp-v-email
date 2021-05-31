import * as EmailValidator from 'email-validator'

import { Avatar, Button, IconButton } from '@material-ui/core'

import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'

const createChat = () => {
  const input = promt('enter an email address')
  if (!input) {
    return null
  }

  if(EmailValidator.validate(input)) {
    //   chats from db
  }
};


function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
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

      <SideBarButton onclick={createChat}>Start a new chat </SideBarButton>

      {/* list of chat */}
    </Container>
  )
}

export default Sidebar

const Container = styled.div``

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
