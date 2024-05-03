import React from "react";
import img1 from "../login/images/imagess.png";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import styled from "styled-components";
import { errorToken, idToken, setId, signup } from "../slices/authSlice";
import { useAppDispatch ,useAppSelector} from "../../app/hooks";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3cbee6;
  display: flex;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  height: 100vh;
  width: 60%;
  background-color: #3cbee6;
`;
const RightContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ffff;
  border-bottom-left-radius: 8%;
  border-top-left-radius: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
const Leftparagraph = styled.p`
  display: flex;
  justify-content: center;
  font-family: Inter;
  font-style: Regular;
  font-size: 24px;
  line-height: 36px;
  color: #ffff;
`;

const LeftImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: -40px;
  margin-left: 50px;
  transform: rotate(-11.7deg);
  @media (max-width: 600px) {
    width: 80%;
    margin-top: -30px;
    margin-left: 15px;
  }
  @media (max-width: 400px) {
    width: 100%;
    margin-top: 0;
    margin-left: 0;
    transform: none;
  }
`;

// const LeftImage = styled.img`
//   width: 608.07px;
//   height: 680.87px;
//   margin-top:-60px;
// margin-left:30px;
//   transform: rotate(-11.7deg);
// `;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  font-family: Noto Sans;
  font-style: Regular;
  font-size: 14px;
  line-height: 19px;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
`;
const ForgotLink = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Ancher = styled.a`
  text-decoration: none;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #2c2c2c;
`;

const Button = styled.div`
  height: 40px;
  width: 300px;
  background-color: #3cbee6;
`;
const ButtonInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: #3cbee6;
  border: none;
  outline: none;
  font-family: Noto Sans;
  font-style: SemiBold;
  font-size: 20px;
  line-height: 27px;
  line-height: 100%;
  color: #fffcfc;
  border-radius: 8px;
`;

const Footer = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #2c2c2c;
`;
const Flink = styled.a`
  text-decoration: none;
  color: #3cbee6;
`;
export default function Signup() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
const id=useAppSelector(idToken)
const error = useAppSelector(errorToken);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
 
  const nav=useNavigate()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response=await dispatch(
      signup({
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        email: inputs.email,
        password: inputs.password,
      })
      
    )
    // if(!error){
    //   nav('/')
    // }
     
   
 
  };
  useEffect(() => {
    if (id) {
      nav('/');
    }
  }, [id, nav]);
  return (
    <MainContainer>
      <LeftContainer>
        <Leftparagraph>
          Find 3D Objects, Mockups <br /> and Illustration Here.
        </Leftparagraph>

        <LeftImage src={img1} alt="mg" />
      </LeftContainer>

      <RightContainer>
        <form onSubmit={handleSubmit}>
          <h1>SIGN UP</h1>

          <InputBox>
            <InputLabel htmlFor="firstname">Firstname</InputLabel>
            <br />
            <Input type="text" name="firstname" onChange={handleInput} />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <br />
            <Input type="text" name="lastname" onChange={handleInput} />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="">Username</InputLabel>
            <br />
            <Input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="password">Password</InputLabel>
            <br />
            <Input type="password" name="password" onChange={handleInput} />
          </InputBox>

          <br />
          <Button>
            <ButtonInput type="submit" value="Sign Up" />
          </Button>

          <div id="footer">
            <Footer>
              Already have an Account? <Flink> <Link to="/">Login </Link></Flink> 
            </Footer>
          </div>
        </form>
      </RightContainer>
    </MainContainer>
  );
}
