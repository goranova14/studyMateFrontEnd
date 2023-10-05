import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import ChatMessagesPlaceholder from '../components/ChatMessagePlaceHolder';
import SendMessagePlaceholder from '../components/SendMessagePlaceholder';
import { Container } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar.js';
import '../components/chat.css'
const ENDPOINT = "http://localhost:8080/ws";
function App(props) {
  const [stompClient, setStompClient] = useState(null);
  const [username, setUsername] = useState('');
  const [messagesReceived, setMessagesReceived] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = (JSON.parse(user)).firstName;
    setUsername(parsedUser)
    if (username) {
      setupStompClient(username);
    }
  }, [username]);
  const setupStompClient = (username) => {
    const socket = new SockJS(ENDPOINT);
    const client = Stomp.over(socket);
    const user = localStorage.getItem('user');
    const parsedUser = (JSON.parse(user));
    client.connect({}, () => {
      client.subscribe('/topic/publicmessages', (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
      });
      client.subscribe(`/user/${parsedUser.course.id}/queue/inboxmessages`, (data) => {
        const message = JSON.parse(data.body);
        setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
      });
    });
    setStompClient(client);
  };
  const sendMessage = (newMessage) => {
    const user = localStorage.getItem('user');
    const parsedUser = (JSON.parse(user));
    if (stompClient) {
      const payload = { name: username, message: newMessage };
      stompClient.publish({ 'destination': `/user/${parsedUser.course.id}/queue/inboxmessages`, body: JSON.stringify(payload) });
    }
  };
  const logout = () => {
    props.logout();
  }
  return (
    <Container fluid>
      <NavigationBar />
      <button onClick={logout}  style={{
          backgroundColor: "#D78521",
          color: "#F4F9E9",
          fontFamily: "cursive",
          fontSize: "1.2rem",
          padding: "10px 25px",
          borderRadius: "5px",
          margin: "10px",
          background: " rgb(160,172,173)",
          background: " linear-gradient(90deg, rgba(160,172,173,1) 0%, rgba(215,133,33,1) 98%)",
        }}>
          Log out
        </button>
      <div className="App">
        <br />
        <div className="chat-container" style={{ backgroundColor: '#F7F7F7' }}>
          <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
          <br />
          <ChatMessagesPlaceholder messagesReceived={messagesReceived} />
        </div>
      </div>
    </Container>
  );
}
export default App;