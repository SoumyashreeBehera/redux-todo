import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import {
  addTodoError,
  addTodoLoading,
  addTodoSuccess,
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../../Redux/action";
import {
  getTodos,
  addTodos,
  toggleTodo,
  deleteTodo,
} from "../../utils/jsonServer";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const { data, isLoading, isError } = useSelector((state) => state.todos);
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetData();
  }, []);

  let handleAddData = async () => {
    dispatch(addTodoLoading());
    try {
      let data = await addTodos(inputData);
      dispatch(addTodoSuccess(data));
      handleGetData();
    } catch (err) {
      dispatch(addTodoError(err.message));
    }
  };

  let handleGetData = async () => {
    dispatch(getTodoLoading());
    try {
      let data = await getTodos();
      dispatch(getTodoSuccess(data));
    } catch (err) {
      dispatch(getTodoError(err.message));
    }
  };

  const handleToggleTodo = async (el) => {
    let res = await toggleTodo(el);
    handleGetData();
  };
  const handleDeleteTodo = async (el) => {
    let res = await deleteTodo(el);
    handleGetData();
  };

  return isLoading ? (
    <div>...Loading</div>
  ) : isError ? (
    <div>error</div>
  ) : (
    <div className={styles.home}>
      <div className={styles.addTodo}>
        {display ? (
          <>
            <div className={styles.addTodoInputs}>
              <div className={styles.addTodoInputBox}>
                <input
                  type="text"
                  placeholder="todo"
                  style={{ height: "83%" }}
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
              </div>
              <button onClick={handleAddData}>Add Todo</button>
            </div>
            <div className={styles.addTodoButton}>
              <button onClick={() => setDisplay(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <div className={styles.addTodoButton}>
            <button onClick={() => setDisplay(true)}>Add Todo</button>
          </div>
        )}
      </div>
      <div className={styles.allTodoBox}>
        {data.map(({ id, status, title }) => (
          <div className={styles.eachTodoBox} key={id}>
            <div className={styles.deleteBox}>
              <div onClick={() => handleDeleteTodo(id)}>
                <i className="ion-close-round" />
              </div>
            </div>
            <div className={styles.titleBox}>
              <div className={styles.titleBoxTaskNo}>{`${id}`}</div>
              <div>
                <div className={styles.titleBoxName}>
                  <div>{`Task Name: ${title}`}</div>
                  <Link className={styles.titleBoxEdit} to={`/todo/${id}`}>
                    <i className="ion-edit" />
                  </Link>
                </div>
              </div>
              <div className={styles.toggleBox}>
                <div>{`Status: ${status ? "Completed" : "Pending"}`}</div>
                <div onClick={() => handleToggleTodo({ id, status, title })}>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={status ? true : false} />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
