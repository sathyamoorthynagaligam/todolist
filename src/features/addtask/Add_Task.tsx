import React from "react";
// import "./Add_Task.css";
import img from "../home/images/Multiply.png";
import clock from "../home/images/Clock.svg";
import styled from "styled-components";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { addtaskapi } from "./addtaskSlice";
import { selectTask } from "./addtaskSlice";
import { selecterror } from "./addtaskSlice";
import { seterror } from "./addtaskSlice";
import Home from "../home/Home";
const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
`;

const TaskBox = styled.div`
  width: 610px;
  height: 678px;
  background: #fffcfc;
`;

const HeaderImage = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 23px;
  margin-top: 24.09px;
  margin-bottom: 14.82px;
`;

const HeaderTitle = styled.div`
  /* height: 24.06px; */
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #2c2c2c;
  margin-bottom: 23.94px;
`;

const InputContainer = styled.div`
  width: 301px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #2c2c2c;
`;

const Input = styled.input`
  width: 301px;
  height: 40px;
  box-sizing: border-box;
  background: #fffcfc;
  border: 1px solid #7b7b7b;
  border-radius: 4px;
  margin-top: 4px;
  margin-bottom: 15px;
  padding-left: 12px;
`;

const DescriptionBox = styled.textarea`
  width: 301px;
  height: 76px;
  resize: none;
  box-sizing: border-box;
  background: #fffcfc;
  border: 1px solid #7b7b7b;
  border-radius: 4px;
  padding-top: 13px;
  padding-left: 12px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const TimeBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ClockBox = styled.div`
  width: 138px;
  height: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid #7b7b7b;
  margin-top: 4px;
  margin-bottom: 15px;
  border-radius: 4px;
  background: #FFFCFC;
`;

const SelectTime = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 12px;
  line-height: 14px;
`;

// const ClockImg = styled.img`
//   width: 15px;
//   height: 15px;
// `;

const Select = styled.select`
  width: 300px;
  height: 40px;
  background: #fffcfc;
  border: 1px solid #7b7b7b;
  border-radius: 4px;
  color: #7b7b7b;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  padding-left: 12px;
  box-sizing: border-box;
  margin-top: 5px;
`;

const FooterBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const CancelBtn = styled.button`
  width: 82px;
  height: 33.13px;
  border: 1px solid #06bee1;
  border-radius: 2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #06bee1;
  background: #fffcfc;
  margin-top: 36px;
`;
const SaveBtn = styled.button`
  width: 82px;
  height: 33.13px;
  border: 1px solid #06bee1;
  border-radius: 2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  background-color: #06bee1;
  color: #ffffff;
  margin-top: 37px;
`;

// const Timeb = styled.input`
//   padding: 0 20px;
//   font-size: 24px;
//   /* visibility: hidden; */
// `

export default function Add_Task() {
  const nav = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    startAt: null,
    completeBy: null,
    startdate:"",
    enddate:'',
    status: "not started",
  });
  const dispatch = useAppDispatch();
  let task = useAppSelector(selectTask);
  let error = useAppSelector(selecterror);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handletDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handletSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const res = await dispatch(
      addtaskapi({
        title: inputs.title,
        description: inputs.description,
        startAt: (inputs.startdate && inputs.startAt)? inputs.startdate +"T"+inputs.startAt +":45.447Z":"",
        completeBy:(inputs.startdate && inputs.startAt)? inputs.enddate +"T"+inputs.completeBy+":45.447Z":"",
        status: inputs.status,
      })
      );
   
    if(res.type=="addtask/addtaskapi/fulfilled"){
      nav("/home")
    }
  if(res.payload=="Unauthorized"){
    nav("/")
  }
  
   
    
    
    
};

  return (
    <>
      {/* <Header /> */}
      <Home/>
      <Body>
        <TaskBox>
          <HeaderImage onClick={() => nav("/home")}>
            <img src={img} alt="multiply" />
          </HeaderImage>

          <HeaderTitle>
            <h1>Add Task</h1>
          </HeaderTitle>
          <InputContainer>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter the Title Name"
                onChange={handleInput}
              />
            </div>

            <div>
              <Label>Description</Label>
              <DescriptionBox
                placeholder="Add a Description"
                name="description"
                onChange={handletDescription}
              />
            </div>

            <TimeBox>
              <div>
                <Label>Start Date</Label>
                <ClockBox>
                  <SelectTime
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="startdate"
                    onChange={handleInput}
                  ></SelectTime>
                </ClockBox>
              </div>
        
              <div>
                <Label>End Date</Label>
                <ClockBox>
                  <SelectTime
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="enddate"
                    onChange={handleInput}
                  ></SelectTime>
                </ClockBox>
              </div>
            </TimeBox>

            <TimeBox>
              <div>
                <Label>Start Time</Label>
                <ClockBox>
                  <SelectTime
                    type="time"
                    placeholder="Enter Start Time"
                    name="startAt"
                    onChange={handleInput} ></SelectTime>
                </ClockBox>
              </div>
        
              <div>
                <Label>End Time</Label>
                <ClockBox>
                  <SelectTime
                    type="time"
                    name="completeBy"
                    onChange={handleInput}></SelectTime>
                </ClockBox>
              </div>
            </TimeBox>

            <div>
              <Label>Status</Label>
              <Select name="status" onChange={handletSelect}>
                <option>Enter Status</option>
                <option value="not started">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>

            <FooterBtn>
              <CancelBtn onClick={() => nav("/home")}>Cancel</CancelBtn>
              <SaveBtn onClick={handleSubmit}>Save</SaveBtn>
            
            </FooterBtn>
          </InputContainer>
        </TaskBox>
      </Body>
    </>
  );
}
