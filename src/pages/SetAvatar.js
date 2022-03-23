import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosUpload } from "../util/axios/axiosInstance";
import { setAvatarRoute } from "../util/axios/routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const SetAvatar = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if ((user.isAvatarSet = true)) {
      navigate("/");
    } else if (!user) {
      navigate("/login");
    }
  }, []);

  const toastOptions = {
    position: "top-center",
    autoClose: "800ms",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // function for calling api
  const postImage = async ({ image }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", user._id.toString());

    const res = await axiosUpload.post(setAvatarRoute, formData, {
      headers: {
        "Content-Type": "multipart-form-data",
      },
    });

    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postImage({ image: file });
      console.log(data);
      dispatch(removeUser());
      dispatch(addUser(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Opps? somthing went wrong", toastOptions);
    }
  };

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <Container>
        <Title>Set Avatar</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="file" onChange={fileSelected} />
          <Button>Add Profile Image</Button>
        </Form>
      </Container>
      ;
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  max-width: 100vw;
  height: 100vh;
  background: #131224;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 100px;
  align-self: flex-start;
  padding-left: 100px;
  margin-bottom: 100px;
`;

const Form = styled.form`
  background: #0b0914;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  border: 2px solid #3e1c96;
  background: #131224;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  background: #7b62c4;
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
`;

export default SetAvatar;
