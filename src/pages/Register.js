import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/chaty-logos_white.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../util/axios/axiosInstance";
import { registerRoute } from "../util/axios/routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const Register = () => {
  // Defining vairables

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // configuring Toast options for modal

  const toastOptions = {
    position: "top-center",
    autoClose: "800ms",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // If user is already logged in and saved into local stoarge code will send them to chat room.

  // useEffect(() => {
  //   if (user.user.username) {
  //     navigate("/");
  //   }
  // }, []);

  // Makes request to api and saves recived user object to redux

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation) {
      try {
        const { data } = await axiosInstance.post(registerRoute, {
          username,
          password,
          email,
        });
        dispatch(removeUser());
        dispatch(addUser(data));
        navigate("/setAvatar");
      } catch (err) {
        toast.error("Opps? somthing went wrong", toastOptions);
      }
    }
  };

  // Code validates user form input

  const handleValidation = () => {
    if (password !== confirmPassword) {
      toast.error("password and confirm password should match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username must be longer than 3 chafacters", toastOptions);
      return false;
    } else if (email.length < 5) {
      toast.error("email must be longer than 5 characters", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("password must be longer than 3 chafacters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Cant leave field empty", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Top>
            <Image src={Logo} />
            <Name>Chatty</Name>
          </Top>
          <InputContainer>
            <Input
              type={"text"}
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type={"email"}
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type={"password"}
              name="password"
              placeholder=" password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type={"password"}
              name="confirmPassword"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit">Create</Button>

            <Span>
              I already have an account{" "}
              <Link
                style={{ color: "blue", textDecoration: "none" }}
                to="/login"
              >
                Login
              </Link>
            </Span>
          </InputContainer>
        </Form>
      </Container>
      <ToastContainer />
    </>
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

const Form = styled.form`
  width: 30%;
  display: flex;
  height: 500px;
  flex-direction: column;
  border-radius: 10px;
  background: #0b0914;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const Name = styled.h2`
  color: white;
  font-size: 30px;
`;

const InputContainer = styled.div`
  max-width: 100%;
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

const Input = styled.input`
  border: 2px solid #3e1c96;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: #7b62c4;
  color: white;
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
`;

const Span = styled.span`
  color: white;
`;

export default Register;
