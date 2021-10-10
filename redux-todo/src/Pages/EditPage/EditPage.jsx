import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getSingleTodos, toggleTodo } from "../../utils/jsonServer";
import styles from "./EditPage.module.css";

export const EditPage = () => {
  const [edit, setEdit] = useState(false);
  const [inputData, setInputData] = useState("");
  const [todo, setTodo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleData();
  }, []);

  const getSingleData = async () => {
    let data = await getSingleTodos(id);
    setTodo(data);
  };

  const handleToggleTodo = async (el) => {
    let res = await toggleTodo(el);
    getSingleData();
  };

  const handleTitleChange = async () => {
    let newData = {
      ...todo,
      status: !todo.status,
      title: inputData,
    };
    let data = await toggleTodo(newData);
    getSingleData();
  };

  return (
    <div>
      <div className={styles.addTodo}>
        {edit ? (
          <div>
            <div className={styles.addTodoInputs}>
              <div className={styles.addTodoInputBox}>
                <input
                  type="text"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="new Todo"
                />
              </div>
              <button onClick={handleTitleChange}>Submit</button>
            </div>
            <div className={`${styles.addTodoButton} ${styles.togglebtn}`}>
              <button onClick={() => handleToggleTodo(todo)}>
                Toggle Status
              </button>
            </div>
            <div className={styles.addTodoButton}>
              <button onClick={() => setEdit(!edit)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className={styles.addTodoButton}>
            <button onClick={() => setEdit(true)}>Edit Todo</button>
          </div>
        )}
      </div>
      <div className={styles.allTodoBox}>
        <div className={styles.eachTodoBox}>
          {/* <div>{todo.title}</div> */}
          <div className={styles.titleBox}>
            <div className={styles.titleBoxTaskNo}>{`${todo.id}`}</div>
            <div>
              <div className={styles.titleBoxName}>
                <div>{`Task Name: ${todo.title}`}</div>
                <div
                  className={styles.titleBoxEdit}
                  onClick={() => setEdit(!edit)}
                >
                  <i className="ion-edit" />
                </div>
              </div>
            </div>
            {/* <div>{todo.status + ""}</div> */}
            <div className={styles.toggleBox}>
              <div>{`Status: ${todo.status ? "Completed" : "Pending"}`}</div>
            </div>
            {/* <button onClick={() => setEdit(!edit)}>Edit</button> */}
            <div className={styles.backbtnbox}>
              <Link className={styles.backbtn} to="/">
                <button>Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
