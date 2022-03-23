import React from "react";
import styled from "styled-components";
import { users } from "../data/users";
import Logo from "../assets/chaty-logos_white.png";

const Chat = () => {
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
              return (
                <Contact>
                  <ProfileImage src={user.profileImage} />
                  <Username>{user.username}</Username>
                </Contact>
              );
            })}
          </Bottom>
        </ContactsContainer>
        <MessageContainer></MessageContainer>
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
`;

export default Chat;
