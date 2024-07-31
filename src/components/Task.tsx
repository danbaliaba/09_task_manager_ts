import { FC, RefObject, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteTask, editTask, ITask } from "../redux/tasksSlice";

interface IProps {
  task: ITask;
  index: number;
}

const Task: FC<IProps> = ({
  task: { title, isCompleted, updatedAt },
  index,
}) => {
  // const now = new Date().toLocaleString();
  const [isEdit, setIsEdit] = useState(false);
  const textRef: RefObject<HTMLTextAreaElement> = useRef(null); // { current: document.getElementById() }
  // const [editDate, setEditDate] = React.useState(now)

  const dispatch: AppDispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(index));
  };

  const handleClickSave = () => {
    if (textRef.current) {
      dispatch(editTask({
        id: index,
        title: textRef.current.value,
        isCompleted,
        updatedAt: new Date(),
      }));
      setIsEdit(false);
      // setEditDate(now)
    }
  };

  return (
    <div
      className={`card mb-3 ${isCompleted ? "bg-light" : ""}`}
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <div>
            <textarea
              ref={textRef}
              defaultValue={title}
              className="form-control mb-2"
            ></textarea>
            <button
              onClick={handleClickSave}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <p
              className={`mb-0 ${
                isCompleted ? "text-decoration-line-through text-muted" : ""
              }`}
              style={{ flexGrow: 1 }}
            >
              {title}
            </p>
            <small className="text-muted mx-5">
              Updated on: {new Date(updatedAt).toLocaleString()}
            </small>
            <input
              checked={isCompleted}
              onChange={() =>
                dispatch(editTask(({
                  id: index,
                  title,
                  isCompleted: !isCompleted,
                  updatedAt: new Date(),
                })))
              }
              type="checkbox"
              className="form-check-input me-2"
            />
            <button
              onClick={() => setIsEdit(true)}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </button>
            <button onClick={handleDeleteTask} className="btn btn-danger btn-sm">
              Del
            </button>
            {/* <div className="badge text-bg-primary text-wrap ms-2 p-2">Last edit {editDate}</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
