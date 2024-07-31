import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ITaskFetch {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  updatedAt: Date;
}

export interface ITasksState {
  tasks: ITask[];
  status: "loading" | "success" | "error";
}

const initialState: ITasksState = {
  tasks: [],
  status: "loading",
};

const sortByDate = (arr: ITask[]) => {
  return arr.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};

export const fetchTasks = createAsyncThunk<ITask[], void, { state: RootState }>(
  "tasks/fetchTasks",
  async () => {
    const data = (
      await axios.get<ITaskFetch[]>(
        "https://jsonplaceholder.typicode.com/todos"
      )
    ).data;
    return sortByDate(
      data.splice(0, 10).map((e: { id: number; title: string; completed: boolean }) => ({
        id: e.id,
        title: e.title,
        isCompleted: e.completed,
        updatedAt: new Date(
          Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
        ),
      }))
    );
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((_, index) => action.payload !== index);
    },
    editTask(state, action: PayloadAction<ITask>) {
      if (
        state.tasks[action.payload.id].title !== action.payload.title ||
        state.tasks[action.payload.id].isCompleted !==
          action.payload.isCompleted
      ) {
        state.tasks = sortByDate(
          state.tasks.map((e, index) =>
            index === action.payload.id ? action.payload : e
          )
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.tasks = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addTask, deleteTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
