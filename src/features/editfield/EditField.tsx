import React from "react";
import img from "../home/images/Multiply.png";
import clock from "../home/images/Clock.svg";
import date from "../home/images/date.svg";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Todo from "../todo/Todo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editapi, selectedit } from "./editslice";
import { alltaskapi, selectAllTask, selecterror } from "../addtask/addtaskSlice";

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
  user-select: none;
`;

const TaskBox = styled.div`
  width: 610px;
  height: 597px;
  background: #fffcfc;
`;

const HeaderImage = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 17.06px;
  margin-top: 14px;
  margin-bottom: 10.91px;
`;

const HeaderTitle = styled.div`
  height: 24.06px;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #2c2c2c;
  margin-bottom: 36.94px;
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
  margin-bottom: 16px;
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
  padding-top: 11px;
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
  padding-left: 12px;
  padding-right: 12.5;
  border: 1px solid #7b7b7b;
  margin-top: 4px;
  margin-bottom: 16px;
  border-radius: 4px;
`;

const SelectTime = styled.label`
display: flex;
justify-content: flex-start;
align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  border: none;
  outline: none;
  font-size: 12px;
  line-height: 14px;
`;

const DateImg = styled.img`
  width: 13.5px;
  height: 15px;
  padding-right: 12.5px;
`;

const ClockImg = styled.img`
  width: 16px;
  height: 16px;
  padding-right: 12px;
`;

const FooterBtn = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 24px;
`;

const CancelBtn = styled.button`
  width: 85.21px;
  height: 33.13px;
  border: 1px solid #06bee1;
  border-radius: 2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #06bee1;
  background: #fffcfc;
`;
const SaveBtn = styled.button`
  width: 83px;
  height: 33.13px;
  border-radius: 2px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  outline: none;
  line-height: 20px;
  background-color: #06bee1;
  color: #ffffff;
`;

export default function EditField() {
  const nav = useNavigate();
  const {id}=useParams();
const [title,setTitle]=useState(''); 
const [description,setDescription]=useState(''); 
const [startAt,setStartAt]=useState(''); 
const [completeBy,setCompleteBy]=useState(''); 

  const dispatch=useAppDispatch();
  const alluser=useAppSelector(selectAllTask)
console.log("alldata"+alluser);
const error=useAppSelector(selecterror)
  useEffect(()=>{
    if(id){
      dispatch(alltaskapi())
   
      const singledata=alluser&& alluser.map((ele:any)=>{
      if(ele.id===id){
      console.log(ele);
      
        setTitle(ele.title)
        setDescription(ele.description)
      setStartAt(ele.startAt)
       setCompleteBy(ele.completeBy)
      }
       }
        )
     
    
     
    }
  },[])

 
  // 
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    };
    const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      await dispatch(editapi({ title: title, description: description,id:id }));
      if (!error) {
        alert("data saved")
        nav("/todo");
      }
    };

  return (
    <>
      <Todo/>
      <Body>
        <TaskBox>
          <HeaderImage onClick={() => nav("/home")}>
            <img src={img} alt="multiply" />
          </HeaderImage>

          <HeaderTitle>
            <h1>Edit Field</h1>
          </HeaderTitle>
          <InputContainer>
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={title&&title}
                placeholder="Enter the Title Name"
              onChange={handleTitle}
              />
            </div>

            <div>
              <Label>Description</Label>
              <DescriptionBox
                placeholder="Add a Description"
                name="description"
                value={description&&description}
               onChange={handleDescription}
              />
            </div>

            <TimeBox>
              <div>
                <Label>Start Date</Label>
                <ClockBox>
                  <SelectTime> {startAt !== null && startAt.slice(8,10)+startAt.slice(4,8)+startAt.slice(0,4)} </SelectTime>

                  <DateImg src={date} alt="clock" />
                </ClockBox>
              </div>
              <div>
                <Label>End Date</Label>

                <ClockBox>
                  <SelectTime>{completeBy!== null && completeBy.slice(8,10)+completeBy.slice(4,8)+completeBy.slice(0,4)}</SelectTime>

                  <DateImg src={date} alt="clock" />
                </ClockBox>
              </div>
            </TimeBox>

            <TimeBox>
              <div>
                <Label>Start Time</Label>
                <ClockBox>
                  <SelectTime >{startAt!== null&& startAt.slice(11,16)}</SelectTime>
                  <ClockImg src={clock} alt="clock" />
                </ClockBox>
              </div>
              <div>
                <Label>End Time</Label>
                <ClockBox>
                  <SelectTime>{completeBy !==null &&completeBy.slice(11,16)}</SelectTime>
                  <ClockImg src={clock} alt="clock" />
                </ClockBox>
              </div>
            </TimeBox>
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
//const [inputs, setInputs] = useState({
  //   title: title,
  //   description: description,
  //   startAt: "",
  //   completeBy: "",
  //   status: "Enter Status",
  // });
  // const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs({ ...inputs, [event.target.name]: event.target.value });
  // };
  // const handletDescription = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setInputs({ ...inputs, [event.target.name]: event.target.value });
  // };
  // const handletSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setInputs({ ...inputs, [event.target.name]: event.target.value });
  // };