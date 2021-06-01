import { Avatar, IconButton } from '@material-ui/core'
import { auth, db } from '../firebase'
import { useRef, useState } from 'react'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import { InsertEmoticon } from '@material-ui/icons'
import Message from './Message'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice'
import TimeAgo from 'timeago-react';
import firebase from 'firebase'
import getRecipentEmail from '../utils/getRecipentEmail'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const endOfMessage = useRef(null)
  const [input, setInput] = useState('')
  const [messageSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  )
  const [recipentSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipentEmail(chat.users, user)),
  )

  const showMessages = () => {
    // console.log(messages,"messages",messageSnapshot);
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message?.id}
          user={message?.data().user}
          message={{
            ...message?.data(),
            timestamp: message?.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(
        <Message key={message?.id} user={message.user} message={message} />
      )
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase?.firestore?.FieldValue?.serverTimestamp(),
      },
      { merge: true },
    )

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase?.firestore?.FieldValue?.serverTimestamp(),
      message: input,
      user: user.email,
      photoUrl: user.photoURL,
    })

    setInput('')
    scrollToBottom()
  }

  const recipentEmail = getRecipentEmail(chat.users, user)
  const recipient = recipentSnapshot?.docs?.[0]?.data()

  console.log('====================================');
  console.log(recipient, "recipient");
  console.log('====================================');
  

  const scrollToBottom = () => {
    endOfMessage.current.scrollIntoView({
      behavior:'smooth',
      block: 'start',
    })
  }
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoUser} />
        ) : (
          <Avatar>{recipentEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          {/* <p> {firebase?.firestore?.FieldValue?.serverTimestamp()} </p> */}
          <h3>{recipentEmail}</h3>
          {recipentSnapshot ? (
            <p>Last Seen :
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : 'Unavailable'}
            </p>
          ) : <p>loading last active ...</p>}

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

      <MessageContainer>
        {messageSnapshot ? showMessages() : null}
        <EndofMessage ref={endOfMessage} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} onClick={sendMessage}>
          {' '}
          Send message
        </button>
        <SettingsVoiceIcon />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen
const Container = styled.div``
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  height: 80px;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`
const HeaderIcons = styled.div``

const MessageContainer = styled.div`
  padding: 10px;
  background-color: #e5ded8;
  min-height: 90vh;
`
const EndofMessage = styled.div`
margin-bottom:50px
`
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  bottom: 0;
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`
