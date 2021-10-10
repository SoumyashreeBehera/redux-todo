import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Completed.module.css";
import {
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../../Redux/action";
import {
  toggleTodo,
  deleteTodo,
  getCompletedTodos,
} from "../../utils/jsonServer";

export default function Completed() {
  // const [inputData, setInputData] = useState("");
  const { data, isLoading, isError } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetData();
  }, []);

  // let handleAddData = async () => {
  //   dispatch(addTodoLoading());
  //   try {
  //     let data = await addTodos(inputData);
  //     dispatch(addTodoSuccess(data));
  //     handleGetData();
  //   } catch (err) {
  //     dispatch(addTodoError(err.message));
  //   }
  // };

  let handleGetData = async () => {
    dispatch(getTodoLoading());
    try {
      let data = await getCompletedTodos();
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
// <button onClick={() => handleEdit(el.id)}>Edit</button>;
