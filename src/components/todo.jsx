import React, { Component } from "react";
import "./todo.css";
export default class Todo extends Component {
  state = { todo: "", val: "", todoList: ["1", "2", "3"], done: [] };
  submit() {
    if (this.state.todo !== "")
      this.setState((prevState) => ({
        todoList: [...prevState.todoList, this.state.todo],
      }));
  }
  updateInput(e) {
    this.setState({
      todo: e.target.value,
    });
  }
  remove = (idx, from) => {
    if (from === "todo") {
      let list = this.state.todoList;
      list.splice(idx, 1);
      this.setState({
        todoList: list,
      });
    } else {
      let list = this.state.done;
      list.splice(idx, 1);
      this.setState({
        done: list,
      });
    }
  };
  check = (idx) => {
    let { todoList, done } = this.state;
    let temp = todoList[idx];
    done.push(temp);
    todoList.splice(idx, 1);
    this.setState({
      todoList,
      done,
    });
  };
  unCheck = (idx) => {
    let { todoList, done } = this.state;
    let temp = done[idx];
    todoList.push(temp);
    done.splice(idx, 1);
    this.setState({
      todoList,
      done,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="flex">
            <input
              className="todo-input"
              placeholder="Enter a todo"
              type="text"
              name="todo"
              id="todo"
              onChange={(e) => this.updateInput(e)}
            />
          </div>
          <div className="btn-primary submit" onClick={() => this.submit()}>
            Add todo
          </div>
        </div>
        <div className="todo-list">
          {this.state.todoList.map((todo, idx) => (
            <TodoTile
              key={idx}
              id={idx}
              title={todo}
              onCheck={this.check}
              onRemove={this.remove}
            />
          ))}
        </div>
        {this.state.done.length !== 0 ? (
          <div className="">Completed</div>
        ) : (
          <div />
        )}
        <div className="todo-list">
          {this.state.done.map((done, idx) => (
            <TodoTile
              key={idx}
              id={idx}
              title={done}
              isDone="true"
              onCheck={this.unCheck}
              onRemove={this.remove}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}
//todo tile component
export function TodoTile(props) {
  const { title, onCheck, onRemove, id, isDone } = props;
  let titleClass = "title";
  let checkButton = "<";
  if (isDone) {
    titleClass += " lineThrough";
    checkButton = ">";
  }
  return (
    <React.Fragment>
      <div className="todo-tile">
        <div className="button" onClick={(e) => onCheck(id)}>
          {checkButton}
        </div>
        <div className={titleClass}>{title}</div>
        <div
          className="button"
          onClick={(e) => onRemove(id, isDone ? "done" : "todo")}
        >
          -
        </div>
      </div>
    </React.Fragment>
  );
}
