import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import io from "socket.io-client";
import Logo from "../assets/chaty-logos_white.png";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../util/axios/axiosInstance";
import { getAllUsersRoute } from "../util/axios/routes";

const socket = io.connect("http://localhost:5002");

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((list) => [...list, data]);
      console.log(messages);
    });
  }, [socket]);

  const joinRoom = (roomCode) => {
    setRoom(roomCode);
    socket.emit("join_room", roomCode);
  };

  useEffect(() => {
    const request = async () => {
      const { data } = await axiosInstance.get(getAllUsersRoute);
      joinRoom(user.user.roomCode);
      setUsers([...data]);
    };

    request();
  }, []);

  const sendMessage = async () => {
    const currentMessage = {
      room,
      message,
      id: Math.floor(Math.random() * 100000),
      sender: user.user.username,
      time: `${new Date(Date.now()).getHours()} : ${new Date(
        Date.now()
      ).getMinutes()}`,
    };

    await socket.emit("send_message", currentMessage);
    await setMessages((list) => [...list, currentMessage]);
    setMessage("");
    console.log(messages);
  };

  return (
    <Container>
      <ChatContainer>
        <ContactsContainer>
          <Top>
            <Image src={Logo} />
            <Title>Chatty</Title>
          </Top>
          <Bottom>
            {users.map((user) => {
              const userRoomCode = user.roomCode;
              return (
                <Contact key={user._id} onClick={() => joinRoom(userRoomCode)}>
                  <ProfileImage src={user.avatar} />
                  <Username>{user.username}</Username>
                </Contact>
              );
            })}
          </Bottom>
        </ContactsContainer>
        <MessageContainer>
          <MessageTop>
            <PowerButton
              onClick={() => {
                dispatch(removeUser());
                navigate("/login");
              }}
            >
              <PowerText>Logout</PowerText>
            </PowerButton>

            <MessageTopText>Online: </MessageTopText>
            <OnlineBubble />
          </MessageTop>
          <MessageMiddle>
            <ScrollToBottom style={{ height: "100%", display: "flex" }}>
              {messages.map((message) => {
                return (
                  <MessageBubble
                    key={message.id}
                    sender={
                      user.user.username === message.sender ? true : false
                    }
                  >
                    {message.message}
                  </MessageBubble>
                );
              })}
            </ScrollToBottom>
          </MessageMiddle>
          <MessageBottom>
            <Input
              name="message"
              placeholder="blah blah"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => (e = e.key === "Enter" && sendMessage())}
              autoComplete="off"
            />
            <SendButton onClick={sendMessage}>
              <AiOutlineSend style={{ color: "black" }} />
            </SendButton>
          </MessageBottom>
        </MessageContainer>
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100vw;
  height: 100vh;
  background: #131224;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatContainer = styled.div`
  width: 90%;
  height: 90%;
  background: #080421;
  display: flex;
`;

const ContactsContainer = styled.div`
  flex: 1;
  disaplay: flex;
  overflow: auto;
  scrollbar-width: none;
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Title = styled.h1`
  color: white;
  font-weight: 500;
`;

const Bottom = styled.div`
  flex: 4;
  background: #080421;
  padding: 0px 10px;
`;

const Contact = styled.div`
  height: 80px;
  max-width: 100%;
  background: #3f3b54;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: white;
  transiton: all 800ms ease-in-out;
  cursor: pointer;
  &:hover {
    background: #595957;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  object-fit: cover;
  margin-right: 10px;
`;

const Username = styled.h3`
  font-weight: 400;
`;

const MessageContainer = styled.div`
  flex: 3;
  background: black;
  display: flex;
  flex-direction: column;
`;

const MessageTop = styled.div`
  height: 10%;
  background: #080421;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
`;

const PowerButton = styled.div`
  background: black;
  padding: 10px;
  color: white;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
`;

const PowerText = styled.p``;

const MessageTopText = styled.p`
  color: white;
  margin-right: 10px;
`;

const OnlineBubble = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #22ff00;
`;

const MessageMiddle = styled.div`
  height: 80%;
  display: flex;
`;

const MessageBubble = styled.div`
  padding: 10px;
  width: 100px;
  margin-bottom: 10px;
  height: 30px;
  background: teal;
  border-radius: 10px;
  align-self: ${(props) => (props.sender ? "flex-end" : "flex-start")};
`;

const MessageBottom = styled.div`
  height: 10%;
  background: #080421;
  display: flex;
`;

const Input = styled.input`
  width: 95%;
  font-weight: bold;
  font-size: 15px;
  padding: 0 10px;
  &: focus {
    outline: none;
  }
`;

const SendButton = styled.div`
  width: 5%;
  background: #03fcc2;
  color: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Chat;
