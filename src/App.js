import "./App.css";
import React, {useReducer, useRef} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE' :{
      newState = [...action.data,...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it)=>it.id === action.data.id? {...action.data}:it)
      break;
    }
    default:
    return state;
  }
  return newState;
}
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext= React.createContext();
const dummyData = () => [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date:1698925849285
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date:1698925849286
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date:1698925849287
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date:1698925849288
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date:1698925849289
  }
];
function App() {
  const [data, dispatch] = useReducer(reducer,dummyData());
  const dataId = useRef(0);
  console.log(new Date().getTime());
  const onCreate = (date,content,emotion) => {
    dispatch({
      type:"CREATE",
      data:{
        id:dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
    }});
    data.current += 1;
  }

  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  }
  
  const onEdit =(targetId, data, content, emotion) => {
    dispatch({
      type: "EDIT",
      data:{
        id:targetId,
        data:new Date(data).getTime(),
        content,
        emotion
      }
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
      value={{
        onCreate,
        onEdit,
        onRemove
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/new" element={<New/>} />
              <Route path="/edit" element={<Edit/>} />
              <Route path="/diary/:id" element={<Diary/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>

  );
}
export default App;