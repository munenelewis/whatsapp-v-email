import { Avatar, IconButton } from '@material-ui/core'
import { auth, db } from '../firebase'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import { InsertEmoticon } from '@material-ui/icons'
import Message from './Message'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice'
import firebase from 'firebase'
import getRecipentEmail from '../utils/getRecipentEmail'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messageSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
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
      return JSON.parse(messages).map((message) =>
        console.log(message, 'message'),
        // <Message key={message?.id} user={message.user} message={message} />
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
  }

  const recipentEmail = getRecipentEmail(chat?.users, user)
  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>{recipentEmail}</h3>
          {/* <p> {firebase?.firestore?.FieldValue?.serverTimestamp()} </p> */}
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
        <EndofMessage />
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
const EndofMessage = styled.div``
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
