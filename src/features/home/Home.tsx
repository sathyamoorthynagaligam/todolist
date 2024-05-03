import React from 'react'
import Header from '../header/Header'
import { selectAllTask } from '../addtask/addtaskSlice'
import { useAppDispatch } from '../../app/hooks'
import { useAppSelector } from '../../app/hooks'
import { useEffect,useState } from 'react'
import { alltaskapi } from '../addtask/addtaskSlice'
import styled from "styled-components";
import img from "../home/images/edit.svg";
import img1 from "../home/images/delete.svg";
import time from "../home/images/time.svg";
import date from "../home/images/date.svg";
import { log } from "console";
import { editapi, editstatusapi } from "../editfield/editslice";
import { useNavigate } from "react-router-dom";
import { deleteapi, selectTodoError } from '../todo/todoSlice'

const TaskBox = styled.div`
  width: 100%;
  height:100vh;
  box-sizing: border-box;
  display: flex;
  padding-top: 59px;
  padding-left: 60px;
  padding-right: 10px;
  padding-bottom: 10px;
  flex-direction: column;
`;
const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  
`
const WrapBox = styled.div`
  display: flex
`;
const BoxSize = styled.div`
  width: 280px;
  height: 127px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 8px 14px 0 14px;
  margin-right: 21px;
  margin-bottom: 42px;
`;
const BoxHeader = styled.div`
  height: 16px;
  width: 100%;
  display: flex;
`;
const BoxTitle = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
`;
const ImgBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;
const EditImg = styled.img`
  width: 12.18px;
  height: 12.17px;
`;
const EditImg1 = styled.img`
  width: 10.67px;
  height: 12px;
  padding-right: 1px;
  padding-left: 12px;
`;
const TaskDisk = styled.label`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #7b7b7b;
  margin: 8px 0;
`;
const ShowBox = styled.div`
  height: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 8px;
`;
const ShowTime = styled.div`
  height: 18px;
  width: 85px;
  display: flex;
  align-items: center;
`;
const TagSpan = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #2c2c2c;
`;
const TimeImage = styled.img`
  width: 15.44px;
  height: 15px;
  padding-right: 10px;
`;
const DateImage = styled.img`
  width: 12px;
  height: 13.33px;
  padding-right: 10px;
`;
const FooterBtn = styled.select`
  display: flex;
  width: 76px;
  height: 24px;
  background: rgba(20, 108, 240, 0.2);
  border-radius: 2px;
  border: none;
  outline: none;
  color: #146cf0;
  font-weight: 500;
  font-size: 12px;
`;
const ListItem = styled.option`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #146cf0;
`;
export default function Home() {
  const alltask=useAppSelector(selectAllTask)
  const dispatch=useAppDispatch();
  const [status,setStatus]=useState('');
  const[did,setdid]=useState(false)
  const nav=useNavigate();
  const todoerror = useAppSelector(selectTodoError);

useEffect(()=>{
  if(todoerror==401){
    nav('/')
  }
},[todoerror])
  useEffect(() => {
      dispatch(alltaskapi());

  }, [dispatch]);
  function chunkArray(array:[], chunkSize:any) {
    var result = [];
    
    for (var i = 0; array && i <  array.length; i += chunkSize) {
      var chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }
 
  let screenWidth =  Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  
  
  let chuckedTodos = chunkArray(alltask,parseInt(""+(screenWidth/ 300)));
// const handlestatus=(event: React.ChangeEvent<HTMLSelectElement>)=>{
 
//   setStatus(event.target.value);
   
//  }
  return (
    <div>
      <Header/>
     
      <TaskBox>
        {chuckedTodos.map(row=><WrapBox>
          {alltask &&
            row.map((task: any) => (
              <BoxSize key={task.id}>
                <BoxHeader>
                  <BoxTitle>{task.title}</BoxTitle>
                  <ImgBox>
                    <EditImg src={img} alt="edit"  onClick={()=>{
                      nav('/editfield/'+task.id)
                    }}
                     ></EditImg>
                    <EditImg1 src={img1} alt="delete" onClick={()=>{
                     dispatch(deleteapi({id:task.id}))
                   
                     alert("deleted successfully")
                     window.location.reload();}}></EditImg1>
                  </ImgBox>
                </BoxHeader>
                <TaskDisk>{task.description}</TaskDisk>
                <ShowBox>
                  <ShowTime>
                    <TimeImage src={time} alt="time" />
                    <TagSpan>
                      {task.startAt && task.startAt.slice(11, -8)}{" "}
                    </TagSpan>
                  </ShowTime>
                  <ShowTime>
                    <DateImage src={date} alt="date" />
                    <TagSpan>
                      
                      {task.startAt !== null &&
                        task.startAt.slice(8, 10) +
                          task.startAt.slice(4, 8) +
                          task.startAt.slice(0, 4) }
                    </TagSpan>
                  </ShowTime>
                </ShowBox>
                <FooterBtn name='status' value={task.status} key={task.id} onChange={(event:React.ChangeEvent<HTMLSelectElement>)=>{
                const  newstatus=(event.target.value)
                   dispatch(
                    editstatusapi({status:newstatus,id:task.id
                    })
                    
                  )
                  window.location.reload();
                }}>
                  <ListItem  value={'not started'}>Todo</ListItem>
                  <ListItem value={'in progress'}>IN PROGRESS</ListItem>
                  <ListItem value={'completed'}>COMPLETED</ListItem>
                </FooterBtn>
             
              </BoxSize>
            ))}
        </WrapBox>)}
      </TaskBox>
      {/* {alltask && alltask.map((task:any) => (
        <div key={task.id}>
          <h2>Title: {task.title}</h2>
          <p>Description:{task.description}</p>
          <p>Starts at: {task.startAt}</p>
          <p>Complete by: {task.completeBy}</p>
          <p>Status: {task.status}</p>
         
        </div>
      ))} */}
      
    </div>
  )
}
