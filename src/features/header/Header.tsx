import styled from "styled-components";
import img1 from "../home/images/office logo.svg";
import img2 from "../home/images/Vector.svg";
import { useLocation, useNavigate } from "react-router-dom";
const HeaderContainer = styled.div`
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding-left: 60px;
  padding-right: 16px;
`;

const HeaderImg = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 40px;
`;

const HeaderList = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const ListItem = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  list-style: none;
  margin-right: 16px;
  font-size: 14px;
  line-height: 19px;
  color: #2c2c2c;
  cursor: pointer;

  &:active,
  :hover {
    color: #06bee1;
    border-bottom: 2px solid #06bee1;
  }
`;

const ListItemActive = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  list-style: none;
  margin-right: 16px;
  font-size: 14px;
  line-height: 19px;
  cursor: pointer;
  color: #06bee1;
  border-bottom: 2px solid #06bee1;
`;

const AddButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 6.75px;
  width: 99px;
  height: 26px;
  background: #06bee1;
  border-radius: 4px;
  cursor: pointer;
`;

const AddButtonSpan = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;

export default function Header() {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderImg src={img1} alt="img" />

      <HeaderList>
        {location.pathname === "/home" ? (
          <ListItemActive onClick={() => nav("/home")}>HOME</ListItemActive>
        ) : (
          <ListItem onClick={() => nav("/home")}>HOME</ListItem>
        )}

        {location.pathname === "/todo" ? (
          <ListItemActive onClick={() => nav("/todo")}>TODO</ListItemActive>
        ) : (
          <ListItem onClick={() => nav("/todo")}>TODO</ListItem>
        )}

        {location.pathname === "/inprogress" ? (
          <ListItemActive onClick={() => nav("/inprogress")}> IN PROGRESS</ListItemActive>
        ) : (
          <ListItem onClick={() => nav("/inprogress")}>IN PROGRESS</ListItem>
        )}
         {location.pathname === "/completed" ? (
          <ListItemActive onClick={() => nav("/completed")}>COMPLETED</ListItemActive>
        ) : (
        <ListItem onClick={() => nav("/completed")}>COMPLETED</ListItem>
        )}
      </HeaderList>

      <AddButtonContainer>
        <AddButton onClick={() => nav("/addtask")}>
          <AddButtonSpan>Add Task</AddButtonSpan>
          <img src={img2} alt="img" />
        </AddButton>
      </AddButtonContainer>
    </HeaderContainer>
  );
}
