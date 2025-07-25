import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todoList,setTodoList] = useState([]);
  const [todoValue,setTodoValue] = useState("");
  const addTask = async() => {
    try {
      const response = await api.post('/tasks',{
        task:todoValue,
        isComplete:false
      });
      if (response.status==200){
        console.log("success");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log("error",err);
    }
  }

  const getTasks = async() => {
    const response = await api.get('/tasks');
    setTodoList(response.data.data);
  };

  const updateTask = async(item) => {
    if (item.isComplete){
      item.isComplete = false;
    } else {
      item.isComplete = true;
    }
    const update = await api.put(`/tasks/${item._id}`,{
      "task":item.task,
      "isComplete":item.isComplete
    });
    getTasks();
  }

  const deleteTasks = async(item) => {
    console.log(`/tasks/${item._id}`);
    const deleteTask = await api.delete(`/tasks/${item._id}`);
    getTasks();
  }

  useEffect(()=>{
    getTasks();
  },[])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event)=>setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTasks={deleteTasks} updateTask={updateTask} />
    </Container>
  );
}

export default App;
