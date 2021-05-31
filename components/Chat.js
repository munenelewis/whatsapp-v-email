import { auth, db } from '../firebase'

import { Avatar } from '@material-ui/core'
import getRecipentEmail from '../utils/getRecipentEmail'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chat({ id, users }) {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [recipentSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipentEmail(users, user)),
  )
  const recipentEmail = getRecipentEmail(users, user)
  const recipient = recipentSnapshot?.docs?.[0]?.data()

  const enterChat = () => {
    router.push(`/chat/${IDBKeyRange}`)
  }
  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoUser} />
      ) : (
        <UserAvatar>{recipentEmail[0]}</UserAvatar>
      )}

      <p>{recipentEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-wrap: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`
const UserAvatar = styled(Avatar)`
  margin: 5px;
  magin-right: 15px;
`
