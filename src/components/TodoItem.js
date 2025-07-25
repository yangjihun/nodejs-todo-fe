import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, deleteTasks, updateTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={item.isComplete?`todo-item`:`item-complete`}>
          <div className={item.isComplete?"todo-content":"todo-content done-content"}>{item.task}</div>

          <div>
            <button className="button-delete" onClick={()=>{deleteTasks(item)}}>삭제</button>
            <button className="button-delete" onClick={()=>{updateTask(item)}}>{item.isComplete?"완료":"미완료"}</button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
